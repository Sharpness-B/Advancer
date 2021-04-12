/*      Updates canvas size on rezise    */
let canvas    = document.getElementsByTagName("canvas")[0];
canvas.height = window.innerHeight;
canvas.width  = window.innerWidth;
let width     = canvas.width;
let height    = canvas.height;
let ctx       = canvas.getContext("2d");
function fit_to_screen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = innerWidth;
    height = innerHeight;
} window.addEventListener('resize', fit_to_screen);



class Player {
    constructor(x,y) {
        this.position = new vec2(x,y);
        this.vx = 0;
        this.vy = 0;
    }

    update() {
        this.position.add(
            new vec2(this.vx, this.vy)
        );
    }
}

let player = new Player(250,100);
let objects = {};



// keyboard input
document.onkeydown = function(e) {
    if (e.key == "a") {
        player.vx = -2;
        player.vy = 0;
    }
    else if (e.key == "d") {
        player.vx = 2;
        player.vy = 0;
    }
    else if (e.key == "w") {
        player.vx = 0;
        player.vy = -2;
    }
    else if (e.key == "s") {
        player.vx = 0;
        player.vy = 2;
    }
    else if (e.key == " ") {
        player.vx = 0;
        player.vy = 0;
    }
}



// pipeline
let dt_old;
let data;


function main() {
    let fps = Math.round(1000 / (performance.now() - dt_old));
    dt_old = performance.now();

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    player.update();

    data = {
        userID: userID,
        polygon: [[player.position.x,player.position.y]],
        lasers: [[3,3],[3,3]],
        missiles: []
    };



    // tegne deg selv
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(player.position.x, player.position.y, 20, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();



    // tegne andre
    if (objects.ships) {
        for (let i=0; i<objects.ships.length; i++) {
            let ship = objects.ships[i];

            let s = {
                position: {
                    x: ship[0][0],
                    y: ship[0][1]
                }
            }
            
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(s.position.x, s.position.y, 20, 0, 2*Math.PI);
            ctx.stroke();
            ctx.fill();
        }
    }



    ctx.fillStyle = "white";
    ctx.fillText(fps.toString(), 10, 30);
    ctx.fillText(cnt.toString(), 10, 70);

    try {
        ctx.fillText(objects.ships[0], 10, 110);
        // console.log(objects.ships[0][0]);
    } catch{}

    requestAnimationFrame(main);
}



let xmlhttp2d;
let cnt = 0;

async function updateObjects2d(url, data) {
    url = "db/updater.php";

    let params = "data=" + JSON.stringify(data) + "&userID=" + userID; // url escape data
    
    xmlhttp2d = new XMLHttpRequest();
    xmlhttp2d.onreadystatechange = handleFile2d;
    xmlhttp2d.open("GET", url+"?"+params, true);
    xmlhttp2d.send();
}

function handleFile2d() {
    if (xmlhttp2d.readyState == 4 && xmlhttp2d.status == 200) {
        let response = xmlhttp2d.response;
        objects = JSON.parse(response);
        
        cnt ++;

        updateObjects2d("db/updater.php", data);
    }
}


main();
updateObjects2d("db/updater.php", data);