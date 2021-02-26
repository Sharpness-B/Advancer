document.getElementById("upgr_body").style.display = "none";

document.getElementsByClassName("button")[0].onmouseover = function(){sound();}
document.getElementsByClassName("button")[1].onmouseover = function(){sound();}
document.getElementsByClassName("button")[2].onmouseover = function(){sound();}

document.getElementById("upgrades").onclick = function() {
    document.getElementById("upgr_body").style.display = "flex";
    document.getElementById("main_menu").style.display = "none";
}
document.getElementById("multiplr").onclick = function() {
    musicCheck();
    location.href = "pages/multiplayer.html"; 
}
document.getElementById("grinding").onclick = function() {
    musicCheck();
    location.href = "pages/singleplayer.html"; 
}
document.getElementById("go_back").onmouseover = function(){sound();}
document.getElementById("go_back").onclick = function() {
    document.getElementById("upgr_body").style.display = "none";
    document.getElementById("main_menu").style.display = "block";
}

// Button sound effect
let audioButton = document.createElement('audio');
audioButton.setAttribute('src', 'assets/button.mp3');
audioButton.load();
function sound(){
    audioButton.currentTime=0;
    audioButton.play();
}