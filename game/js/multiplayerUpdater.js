let xmlhttp;

function updateObjects(url, data) {
    let params = "data="+data;
    
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = handleFile;
    xmlhttp.open("GET", url, true);
    xmlhttp.send(params);
}

function handleFile(){
    if (xmlhttp. readyState == 4 && xmlhttp.status == 200) {
        let response = JSON.parse(xmlhttp.response);
        objects = response;
    }
}
