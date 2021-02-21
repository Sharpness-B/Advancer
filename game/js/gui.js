let loca = document.location.href.split("/");
if (loca[loca.length-1].toString() == "index.html") {
    buttonSoundEffectSetup();

    document.getElementById("upgrades").onclick = function() {
        musicCheck();
        location.href = "pages/upgrades.html"; 
    }
    document.getElementById("multiplr").onclick = function() {
        musicCheck();
        location.href = "pages/multiplayer.html"; 
    }
    document.getElementById("grinding").onclick = function() {
        musicCheck();
        location.href = "pages/singleplayer.html"; 
    }
}
if (loca[loca.length-1].toString() == "upgrades.html") {
    document.getElementById("go_back").onmouseover = function(){sound();}
    document.getElementById("go_back").onclick = function() {
        musicCheck();
        location.href = "../index.html";
    }
}
if (loca[loca.length-1].toString() == "singleplayer.html" || loca[loca.length-1].toString() == "multiplayer.html") {
    document.getElementById("main_menu").style.display = "none";
    buttonSoundEffectSetup();

    document.getElementById("go_back2").onclick = function() {
        musicCheck();
        location.href = "../index.html";
    }
    document.getElementById("resume").onclick = function() {
        document.getElementById("main_menu").style.display = "none";
    }

}
function buttonSoundEffectSetup() {
    let b1 = document.getElementsByClassName("button")[0];
    let b2 = document.getElementsByClassName("button")[1];
    let b3 = document.getElementsByClassName("button")[2];
    b1.onmouseover = function() {sound();}
    b2.onmouseover = function() {sound();}
    b3.onmouseover = function() {sound();}
}
let audioButton = document.createElement('audio');
if (loca[loca.length-1].toString() == "index.html") audioButton.setAttribute('src', 'assets/button.mp3');
else {audioButton.setAttribute('src', '../assets/button.mp3'); }
audioButton.load();
function sound(){
    audioButton.currentTime=0;
    audioButton.play();
}

function musicCheck() {
    if (readCookie("music")) eraseCookie("music");
    createCookie("music",audioElement.currentTime);
}
function createCookie(name,value) {
    let date = new Date();
    date.setTime(date.getTime() + (60 *1000));
    let expires = "; expires=" + date.toGMTString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

if (loca[loca.length-1].toString() == "index.html" || (loca[loca.length-1].toString() == "upgrades.html")) {
    let cnv1 = document.getElementById("menu_canvas");
    if (cnv1) {
        let ctx = cnv1.getContext("2d"), starList = [];
        for (let i=0;i<100;i++) {
            starList.push({
                x: Math.ceil(Math.random()*innerWidth-5), 
                y: Math.ceil(Math.random()*innerHeight-5), 
                spdY: Math.ceil(Math.random()*5) 
            }); 
        }
        setInterval(() => {
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,cnv1.width,cnv1.height);
            ctx.fillStyle = "white";
            for (let i=0;i<100;i++) {
                let s = starList[i];
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.spdY, 0, 2*Math.PI);
                ctx.fill();
                s.y+=s.spdY;
                if (s.y > cnv1.height) starList[i] = {x: Math.ceil(Math.random()*innerWidth-5), y: 0, spdY: Math.ceil(Math.random()*5) }
            }
        }, 30);
    }
}
