let userID;
let fingerprint;
let balance;
let upgrades;
let xmlhttpUserID;

function login() {
    console.log("logging in")

    // hvis cookie
    if (cookie.readCookie("userID")) {
        userID = cookie.readCookie("userID");   
        cookie.eraseCookie("userID");
    }

    // hvis ikke
    else {
        userID = 0;
    }

    FingerprintJS.load().then(fp => {
        fp.get().then(result => {
            fingerprint = result.visitorId;
            DBstoreUserID_getUpgrades("db/registrer.php", userID, fingerprint);
        });
    });
}

// registrer bruker i DB hvis ny. hent ut nivå på oppgraderinger, og lag en cookie til slutt
function DBstoreUserID_getUpgrades(url, userID, fingerprint) {
    let params = "userID=" + userID +"&fingerprint=" + fingerprint;

    xmlhttpUserID = new XMLHttpRequest();
    xmlhttpUserID.onreadystatechange = upgradesResponse;
    xmlhttpUserID.open("GET", url+"?"+params, true);
    xmlhttpUserID.send();
}

function upgradesResponse(){
    if (xmlhttpUserID.readyState == 4 && xmlhttpUserID.status == 200) {
        let response = xmlhttpUserID.response;
        let responsObject = JSON.parse(response);

        userID = responsObject.userID;
        upgrades = responsObject.upgrades;
        balance = responsObject.balance;

        if (!multiplayer && !singleplayer) {
            updatePrices(upgrades);
            updateDotColors(upgrades);
            updateBalance(balance);
        }

        cookie.createCookie("userID", userID, 60*60*24*60);

        console.log("---> login complete; userID: " + userID.toString());
    }
}

// <script defer src="js/userIdentifier.js"></script>
// <script defer async src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js"
//     onload="login()">
// </script>
