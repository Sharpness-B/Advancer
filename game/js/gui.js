let loca = document.location.href.split("/");
if (loca[loca.length-1].toString() == "index.html") {
    document.getElementsByClassName("button")[0].onmouseover = function(){sound();}
    document.getElementsByClassName("button")[1].onmouseover = function(){sound();}
    document.getElementsByClassName("button")[2].onmouseover = function(){sound();}

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
    document.getElementsByClassName("button")[0].onmouseover = function(){sound();}
    document.getElementsByClassName("button")[1].onmouseover = function(){sound();}

    document.getElementById("go_back2").onclick = function() {
        musicCheck();
        location.href = "../index.html";
    }
    document.getElementById("resume").onclick = function() {
        document.getElementById("main_menu").style.display = "none";
    }
}

let audioButton = document.createElement('audio');
if (loca[loca.length-1].toString() == "index.html") audioButton.setAttribute('src', 'assets/button.mp3');
else {audioButton.setAttribute('src', '../assets/button.mp3'); }
audioButton.load();
function sound(){
    audioButton.currentTime=0;
    audioButton.play();
}