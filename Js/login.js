// The Auth0 client, initialized in configureClient()
let auth0 = null;

/**
 * Starts the authentication flow
 */
const login = async (targetUrl) => {
  try {
    console.log("Logging in", targetUrl);

    const options = {
      redirect_uri: window.location.origin + "/home",
    };

    if (targetUrl) {
      options.appState = { targetUrl };
    }

    await auth0.loginWithRedirect(options);
  } catch (err) {
    console.log("Log in failed", err);
  }
};

/**
 * Executes the logout flow
 */
const logout = () => {
  try {
    console.log("Logging out");
    auth0.logout({
      returnTo: window.location.origin,
    });
    document.cookie =
      "currentUser=null;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  } catch (err) {
    console.log("Log out failed", err);
  }
};

async function getUserInfo() {
  const userPromise = await auth0.getUser();
  const userdata = JSON.parse(JSON.stringify(userPromise));
  //TODO: store bios & banner colors & maybe pfps in restDB?
  var newData = {
    username: userdata["https://data/username"],
    userId: userdata.sub.replace("auth0|", ""),
  };

  var settings = {
    async: false,
    crossDomain: true,
    url: `https://swipernoswiping-3b4f.restdb.io/rest/userdata?q={"userid":"${newData.userId}"}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": "60ce0b22e2c96c46a246371f",
      "cache-control": "no-cache",
    },
  };
  $.ajax(settings).done(function (data) {
    if (!data[0]) {
      console.error("Data not in database (UserData)");
      return null;
    }
    data = data[0];
    console.log(data[0]);
    newData.color = data.color;
    newData.profile = data.profile;
    newData.bio = data.bio;
  });

  console.log(newData);
  return newData;
}

/**
 * Updates the user interface
 */
const updateUI = async () => {
  try {
    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
      var user = await getUserInfo();
      $(".profile-btn span").text(user.username);
      $(".profile-btn img").attr("src", user.profile).css("background-color",user.color);

      $("#user-options").append(
        `<div class="your-profile"><i class="fa fa-user"></i>  Your profile</div><div class="logout"><i class="fa fa-sign-out"></i>  Log out</div>`
      );
      $(".profile-btn").click(function () {
        $("#user-options").fadeToggle();
      });
      $("#user-options .your-profile").click(function () {
        window.location.href = "https://swipernoswiping.netlify.app/profile";
      });
      $("#user-options .logout").click(function () {
        logout();
      });
      //show logged in stuff
    } else {
      $(".profile-btn").click(function () {
        login(window.location.location);
      });
      //Show logged out stuff
    }
  } catch (err) {
    console.log("Error updating UI!", err);
    return;
  }
};

/**

 * Initializes the Auth0 client
 */
const configureClient = async () => {
  auth0 = await createAuth0Client({
    domain: "swipernoswiping.us.auth0.com",
    client_id: "vE6tlH4tCrynnE4FF8LW0p7DNvD3xeI4",
  });
};

// Will run when page finishes loading
window.onload = async () => {
  await configureClient();

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    console.log("> User is authenticated");
    //window.history.replaceState({}, document.title, window.location.pathname);
    updateUI();
  } else {
    console.log("> User not authenticated");

    const query = window.location.search;
    const shouldParseResult =
      query.includes("code=") && query.includes("state=");

    if (shouldParseResult) {
      console.log("> Parsing redirect");
      try {
        const result = await auth0.handleRedirectCallback();
        console.log("Logged in!");
        var currUser = await getUserInfo();
        document.cookie = "currentUser=" + JSON.stringify(currUser) + ";";
        //TODO: Edit these when profile changed
      } catch (err) {
        console.log("Error parsing redirect:", err);
      }
      window.history.replaceState({}, document.title, "/");
    }

    updateUI();
  }
};
