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


/**
 * Updates the user interface
 */
const updateUI = async () => {
    try {
        const isAuthenticated = await auth0.isAuthenticated();

        if (isAuthenticated) {
            const user = await auth0.getUser();

            /*document.getElementById("profile-data").innerText = JSON.stringify(
              user,
              null,
              2
            );*/

            //show logged in stuff
        } else {
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

    // If unable to parse the history hash, default to the root URL
    if (!showContentFromUrl(window.location.pathname)) {
        showContentFromUrl("/");
        window.history.replaceState({ url: "/" }, {}, "/");
    }

    const bodyElement = document.getElementsByTagName("body")[0];

    // Listen out for clicks on any hyperlink that navigates to a #/ URL
    bodyElement.addEventListener("click", (e) => {
        if (isRouteLink(e.target)) {
            const url = e.target.getAttribute("href");

            if (showContentFromUrl(url)) {
                e.preventDefault();
                window.history.pushState({ url }, {}, url);
            }
        }
    });

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

            if (result.appState && result.appState.targetUrl) {
                showContentFromUrl(result.appState.targetUrl);
            }

            console.log("Logged in!");
        } catch (err) {
            console.log("Error parsing redirect:", err);
        }

        window.history.replaceState({}, document.title, "/");
    }

    updateUI();
};