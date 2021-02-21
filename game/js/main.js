let objects = [];

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
    cnv.width = innerWidth-5;
    cnv.height = innerHeight-5;
} fit_to_screen();
window.addEventListener('resize', fit_to_screen);

/* Keyinputs */
let loc = document.location.href.split("/");
if (loc[loc.length-1].toString() == "singleplayer.html" || loc[loc.length-1].toString() == "multiplayer.html") {
    document.addEventListener('keyup', function(){
        let key = event.key;
        if (key == "Escape") {
            let ingame_menu = document.getElementById("main_menu");
            if (ingame_menu.style.display != "block") ingame_menu.style.display = "block";
            else {ingame_menu.style.display = "none";}
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
