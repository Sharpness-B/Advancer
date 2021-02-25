let userID;
let fingerprint;
let upgrades;
let xmlhttpUserID;

function initFingerprintJS() {
    // hvis cookie
    if (readCookie("userID")) {
        userID = readCookie("userID");        
        eraseCookie("userID");
        registrer(userID, null);
    }

    // hvis ikke
    else {
        userID = 0;

        FingerprintJS.load().then(fp => {
            fp.get().then(result => {
                fingerprint = result.visitorId;
                registrer(userID, fingerprint)
            });
        });
    }
}

// registrer bruker i DB hvis ny. hent ut nivå på oppgraderinger
function registrer(userID, fingerprint) { 
    DBstoreUserID_getUpgrades("../db/registrer.php", userID, fingerprint); 
    createCookie("userID", userID, 60*60*24*60);
}

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
        
        console.log(response);

        responsObject = JSON.parse(response);

        userID = responsObject.userID;
        upgrades = responsObject.upgrades;
    }
}

// <script defer src="js/userIdentifier.js"></script>
// <script defer async src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js"
//     onload="initFingerprintJS()">
// </script>
