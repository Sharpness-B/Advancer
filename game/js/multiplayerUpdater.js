let xmlhttp;

function updateObjects(url, data) {
    let params = "data=" + JSON.stringify(data) + "&userID=" + $userID; // url escape data
    
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = handleFile;
    xmlhttp.open("GET", url+"?"+params, true);
    xmlhttp.send();
}

function handleFile(){
    if (xmlhttp. readyState == 4 && xmlhttp.status == 200) {
        let response = xmlhttp.response;
        objects = JSON.parse(response);
    }
}
