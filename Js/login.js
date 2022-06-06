// The Auth0 client, initialized in configureClient()
let auth0 = null;

/**
 * Starts the authentication flow
 */
const login = async (targetUrl) => {
    try {
        console.log("Logging in", targetUrl);

        const options = {
            redirect_uri: window.location.origin
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
            returnTo: window.location.origin
        });
    } catch (err) {
        console.log("Log out failed", err);
    }
};


function getUserInfo() {
    const userPromise = auth0.getUser();
    const userdata = JSON.parse(JSON.stringify(userPromise))
    //TODO: store bios in restDB?
    var newData = {
        username = userdata["https://data/username"],
        userId = userdata.sub.replace('auth0|', ''),
        profile = userdata.picture
    }
    return newData
}

/**
 * Updates the user interface
 */
const updateUI = async () => {
    try {
        const isAuthenticated = await auth0.isAuthenticated();

        if (isAuthenticated) {
           var user = getUserInfo()
            $(".profile-btn span").text(user.username)

            $("#user-options").append(`<div class="your-profile"><i class="fa fa-user"></i>  Your profile</div><div class="logout"><i class="fa fa-sign-out"></i>  Log out</div>`)
            $(".profile-btn").click(function () {
                $("#user-options").fadeToggle()
            })
            $("#user-options .your-profile").click(function () {
                window.location.href = "https://swipernoswiping.netlify.app/profile"
            })
            $("#user-options .logout").click(function () {
                logout()
            })
            //show logged in stuff
        } else {
            $(".profile-btn").click(function () {
                login(window.location.location)
            })
            //Show logged out stuff
        }
    } catch (err) {
        console.log("Error updating UI!", err);
        return;
    }
}

/**

 * Initializes the Auth0 client
 */
const configureClient = async () => {

    auth0 = await createAuth0Client({
        domain: "swipernoswiping.us.auth0.com",
        client_id: "vE6tlH4tCrynnE4FF8LW0p7DNvD3xeI4"
    });
};

/**
 * Checks to see if the user is authenticated. If so, `fn` is executed. Otherwise, the user
 * is prompted to log in
 */
const requireAuth = async (fn, targetUrl) => {
    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        return fn();
    }

    return login(targetUrl);
};

// Will run when page finishes loading
window.onload = async () => {
    await configureClient();

    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        console.log("> User is authenticated");
        window.history.replaceState({}, document.title, window.location.pathname);
        updateUI();
        return;
    }

    console.log("> User not authenticated");

    const query = window.location.search;
    const shouldParseResult = query.includes("code=") && query.includes("state=");

    if (shouldParseResult) {
        console.log("> Parsing redirect");
        try {
            const result = await auth0.handleRedirectCallback();
            console.log("Logged in!");
        } catch (err) {
            console.log("Error parsing redirect:", err);
        }

        window.history.replaceState({}, document.title, "/");
    }

    updateUI();
};