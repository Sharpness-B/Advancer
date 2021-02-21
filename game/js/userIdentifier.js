let userID;
let upgrades;
let xmlhttpUserID;

function initFingerprintJS() {
    FingerprintJS.load().then(fp => {
        fp.get().then(result => {
            userID = result.visitorId;
            DBstoreUserID("db/registrer.php", userID);
        });
    });
}

function DBstoreUserID(url, userID) {
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

// <script src="js/userIdentifier.js"></script>
// <script async src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js"
//     onload="initFingerprintJS()">
// </script>