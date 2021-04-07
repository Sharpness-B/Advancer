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

function main() {
    let fps = Math.round(1000 / (performance.now() - dt_old));
    dt_old = performance.now();

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);



    player.update();

    let data = {
        userID: userID,
        polygon: [[player.position.x,player.position.y]],
        lasers: [[3,3],[3,3]],
        missiles: []
    };

    updateObjects("db/updater.php", data);



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

    requestAnimationFrame(main);
}


main();