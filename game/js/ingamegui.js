document.getElementById("main_menu").style.display = "none";
document.getElementsByClassName("button")[0].onmouseover = function(){sound();}
document.getElementsByClassName("button")[1].onmouseover = function(){sound();}

document.getElementById("go_back2").onclick = function() {
    musicCheck();
    location.href = "index.html";
}
document.getElementById("resume").onclick = function() {
    document.getElementById("main_menu").style.display = "none";
}

// Button sound effect
let audioButton = document.createElement('audio');
audioButton.setAttribute('src', 'assets/button.mp3');
audioButton.load();
function sound(){
    audioButton.currentTime=0;
    audioButton.play();
}