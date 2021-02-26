// request to transaction.php
let xmlhttp;

function executePurchase(url, userID, upgrade) {
    let params = "userID=" + userID +"&upgrade=" + upgrade;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = handleFile;
    xmlhttp.open("GET", url+"?"+params, true);
    xmlhttp.send();
}

function handleFile(){
    if (xmlhttp. readyState == 4 && xmlhttp.status == 200) {
        let response = xmlhttp.response;
        upgrades = JSON.parse(response);
        
        console.log(upgrades)
    }
}



// button interaction
let button_armor   = document.getElementById("button_armor");
let button_speed   = document.getElementById("button_speed");
let button_laser   = document.getElementById("button_laser");
let button_missile = document.getElementById("button_missile");
let button_energy  = document.getElementById("button_energy");

button_armor.onclick = function() {
    executePurchase("db/transaction.php", userID, "armor");   
    updatePrice(button_armor, price(upgrades.armor+1));
}

button_speed.onclick = function() {
    executePurchase("db/transaction.php", userID, "speed");   
    updatePrice(button_speed, price(upgrades.speed+1));
}

button_laser.onclick = function() {
    executePurchase("db/transaction.php", userID, "laser");   
    updatePrice(button_laser, price(upgrades.laser+1));
}

button_missile.onclick = function() {
    executePurchase("db/transaction.php", userID, "missile"); 
    updatePrice(button_missile, price(upgrades.missile+1));
}

button_energy.onclick = function() {
    executePurchase("db/transaction.php", userID, "energy");  
    updatePrice(button_energy, price(upgrades.energy+1));
}



// visual effects
function price(level) {
    if (level<5) return (level*10).toString();
    else         return "maxed";      
}

function updatePrice(element, price) {
    element.innerHTML = price+"§";
}