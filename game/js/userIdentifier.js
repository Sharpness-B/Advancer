let userID;
let upgrades;
let xmlhttpUserID;

function initFingerprintJS() {
    // hvis cookie
    if (readCookie("userID")) {
        eraseCookie("userID");
        userID = readCookie("userID");
        createCookie("userID", userID);
    }

    // hvis ikke
    FingerprintJS.load().then(fp => {
        fp.get().then(result => {
            userID = result.visitorId;
            // lagre i cookie
            createCookie("userID", userID);
        });
    });

    // registrer bruker i DB hvis ny. hent ut nivå på oppgraderinger
    DBstoreUserID_getUpgrades("../db/registrer.php", userID); 
}

function DBstoreUserID_getUpgrades(url, userID) {
    let params = "userID=" + userID;
    
    xmlhttpUserID = new XMLHttpRequest();
    xmlhttpUserID.onreadystatechange = upgradesResponse;
    xmlhttpUserID.open("GET", url+"?"+params, true);
    xmlhttpUserID.send();
}

function upgradesResponse(){
    if (xmlhttpUserID. readyState == 4 && xmlhttpUserID.status == 200) {
        let response = xmlhttpUserID.response;
        upgrades = JSON.parse(response);

        console.log(userID);
        console.log(upgrades);
    }
}

// <script defer src="js/userIdentifier.js"></script>
// <script defer async src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js"
//     onload="initFingerprintJS()">
// </script>