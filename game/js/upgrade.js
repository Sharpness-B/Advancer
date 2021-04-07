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
        let responseObject = JSON.parse(response);

        balance = responseObject.balance;
        upgrades = responseObject.upgrades;

        updatePrices(upgrades);
        updateDotColors(upgrades);
        updateBalance(balance);

        console.log("---> upgrade process complete; response: ", responseObject);
    }
}



// button interaction
let button_armor   = document.getElementById("button_armor"  );
let button_speed   = document.getElementById("button_speed"  );
let button_laser   = document.getElementById("button_laser"  );
let button_missile = document.getElementById("button_missile");
let button_energy  = document.getElementById("button_energy" );

let p_balance  = document.getElementById("balance");

button_armor.onclick   = function() {executePurchase("db/transaction.php", userID, "armor"  );}
button_speed.onclick   = function() {executePurchase("db/transaction.php", userID, "speed"  );}
button_laser.onclick   = function() {executePurchase("db/transaction.php", userID, "laser"  );}
button_missile.onclick = function() {executePurchase("db/transaction.php", userID, "missile");}
button_energy.onclick  = function() {executePurchase("db/transaction.php", userID, "energy" );}



// visual effects
function price(level) {
    if (level<5) return (level*10).toString() + "§";
    else         return "maxed";      
}

function updatePrices(upgrades) {
    button_armor  .innerHTML = price(upgrades.armor  );
    button_speed  .innerHTML = price(upgrades.speed  );
    button_laser  .innerHTML = price(upgrades.laser  );
    button_missile.innerHTML = price(upgrades.missile);
    button_energy .innerHTML = price(upgrades.energy );
}

function updateDotColors(upgrades) {
    let keys = Object.keys(upgrades);

    for (let i=0; i<keys.length; i++) { // for hver oppgradering
        for (let l=1; l<=upgrades[keys[i]]; l++) { // for hver level
            let elementID = "dot" + keys[i] + l.toString();
            let element   = document.getElementById(elementID);
 
            element.classList.remove("dot");
            element.classList.add("dotFilled");
        }
    }
}

function updateBalance(balance) {
    p_balance.innerHTML = balance.toString() + "§";
}



// Canvas

let ctx = document.getElementById("canvasPreview").getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);

let fps = 0;
let drawFps;
let dt_old = 0;   // Til å ta tiden brukt per frame

let intervalFpsCounter = setInterval(function() { drawFps = fps; }, 200);

let scale = ctx.canvas.width/2;

let light = new illumination("upgradesLight");
let fig = new figure("kiranSpesial");

for(let v = 0; v < fig.vert.length; v++) {fig.vert[v].transform(Matrix.rotateX(Math.PI/2));}

let cam = new Camera(new vec3(0.0, 3.0, -3.0), // Pos
                     new vec3(0.0, 0.0, -1.0), // Dir
                     1.6, 1.0, -5.0);          // FOV, near, far



function mainLoop()
{
    fps = Math.round(1000 / (performance.now() - dt_old));
    dt_old = performance.now();

    for(let v = 0; v < fig.vert.length; v++)
    {
        fig.vert[v].transform(Matrix.rotateY(0.01));
    }

    ctx.clearRect(-ctx.canvas.width/2, -ctx.canvas.height/2, ctx.canvas.width, ctx.canvas.height);

    DrawModel(fig);

    ctx.fillStyle = "white";
    ctx.fillText(drawFps, -300, -200);

    requestAnimationFrame(mainLoop);
}
mainLoop();