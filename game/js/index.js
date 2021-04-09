// Button functionality
document.getElementsByClassName("button")[0].onmouseover = function(){sound();}
document.getElementsByClassName("button")[1].onmouseover = function(){sound();}
document.getElementsByClassName("button")[2].onmouseover = function(){sound();}

document.getElementById("upgrades").onclick = function() {
    document.getElementById("upgr_body").style.display = "flex";
    document.getElementById("main_menu").style.display = "none";
}
document.getElementById("multiplr").onclick = function() {
    musicCheck();
    location.href = "multiplayer.html"; 
}
document.getElementById("grinding").onclick = function() {
    musicCheck();
    location.href = "singleplayer.html"; 
}
document.getElementById("go_back").onmouseover = function(){sound();}
document.getElementById("go_back").onclick = function() {
    document.getElementById("upgr_body").style.display = "none";
    document.getElementById("main_menu").style.display = "block";
}

// Button sound effect

var audioElement2 = new Audio('button.mp3');
function sound() {
    audioElement2.src = 'assets/button.mp3'
    audioElement2.play();
}
/*
//let audioButton = document.createElement('audio');
function sound(){
    audioButton.setAttribute('src', 'assets/button.mp3');
    audioButton.load();
    audioButton.currentTime=0;
    audioButton.play();
}
*/

// Canvas menu moving background
let cnv1 = document.getElementById("menu_canvas");
if (cnv1) {
    let ctxBG = cnv1.getContext("2d"), starList = [];
    for (let i=0;i<100;i++) {
        starList.push({
            x: Math.ceil(Math.random()*innerWidth-5), 
            y: Math.ceil(Math.random()*innerHeight-5), 
            spdY: Math.ceil(Math.random()*5) 
        }); 
    }
    setInterval(() => {
        ctxBG.fillStyle = "black";
        ctxBG.fillRect(0,0,cnv1.width,cnv1.height);
        ctxBG.fillStyle = "white";
        for (let i=0;i<100;i++) {
            let s = starList[i];
            ctxBG.shadowBlur = s.spdY*4;
            ctxBG.shadowColor = "white";
            ctxBG.beginPath();
            ctxBG.arc(s.x, s.y, s.spdY, 0, 2*Math.PI);
            ctxBG.fill();
            s.y+=s.spdY;
            if (s.y > cnv1.height) starList[i] = {x: Math.ceil(Math.random()*innerWidth-5), y: 0, spdY: Math.ceil(Math.random()*5) }
        }
    }, 30);
}

/*      Updates canvas size on rezise    */
let canvas    = document.getElementsByTagName("canvas")[0];
canvas.height = window.innerHeight;
canvas.width  = window.innerWidth;
let width     = canvas.width;
let height    = canvas.height;
let ctxBG       = canvas.getContext("2d");
function fit_to_screen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = innerWidth;
    height = innerHeight;
} window.addEventListener('resize', fit_to_screen);
