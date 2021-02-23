let objects = [];
let loc = document.location.href.split("/");

let ship = {
    brand: "Tesla",
    model: "Roadster",
    year: 2008,
    boundingvolume: [[1,3,4], [3,4,2], [2,10,4]]
};

function pipeline() {    
    if (multiplayer)       updateObjects("../db/updater.php", ship);
    else if (singleplayer) ;
}

setInterval(pipeline, 500);  

/*      Updates canvas size on rezise    */
let cnv = document.getElementsByTagName("canvas")[0];
function fit_to_screen(){
    cnv.width = innerWidth;
    cnv.height = innerHeight;
} fit_to_screen();
window.addEventListener('resize', fit_to_screen);

/* Keyinputs */
if (loc[loc.length-1].toString() == "singleplayer.html" || loc[loc.length-1].toString() == "multiplayer.html") {
    document.addEventListener('keyup', function(){
        let key = event.key;
        if (key == "Escape") {
            let ingame_menu = document.getElementById("main_menu");
            if (ingame_menu.style.display != "block") {
                ingame_menu.style.display = "block";
                document.getElementById("game_svg").style.display = "none";
            }
            else {
                ingame_menu.style.display = "none";
                document.getElementById("game_svg").style.display = "block";
            }
        }
    });
}

/* MUSIC */
function readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') { c = c.substring(1,c.length); }
        if (c.indexOf(nameEQ) == 0) return parseFloat(c.substring(nameEQ.length,c.length));
    }
    return null;
}

let audioElement = document.createElement('audio');
if (loc[loc.length-1].toString() == "index.html") audioElement.setAttribute('src', 'assets/music1.mp3');
else {audioElement.setAttribute('src', '../assets/music1.mp3'); }
audioElement.load();
audioElement.play();
c = readCookie("music");
if (c) audioElement.currentTime = c;

/* Canvas game */
if (loc[loc.length-1].toString() == "singleplayer.html" || loc[loc.length-1].toString() == "multiplayer.html") {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let fps = 30;
    let img = new Image();
    img.src = '../assets/insidespaceship2.png';
    setInterval(() => {
        let w = window.innerWidth;
        let h = window.innerHeight;

        // Radar center
        let rC = h-(h/5.5);
        
        // Clear canvas
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,w,h);
        ctx.fill();

        
        ctx.drawImage(img,0,0,w,h);

        // Ellipse cockpit

        // Ellipse Radar
        ctx.strokeStyle = "#989c8c";
        ctx.lineWidth = "8";
        ctx.beginPath();
        ctx.arc(w/2, rC,h/6,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = "rgba(48,230,240,0.2)";
        ctx.beginPath();
        ctx.arc(w/2, rC,h/6,0,2*Math.PI);
        ctx.fill();

        // Radar enemies
        ctx.beginPath();
        ctx.fillStyle = "rgba(48,230,240,1)";
        ctx.arc(w/2, rC, 10, 0, 2*Math.PI);
        ctx.fill();

        // Enemy's (x,y) pos relativ til meg + missiler.
    }, 1000/fps);
}
