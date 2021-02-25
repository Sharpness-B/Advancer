/* MUSIC */
let loc = document.location.href.split("/");
let audioElement = document.createElement('audio');
if (loc[loc.length-1].toString() == "index.html") audioElement.setAttribute('src', 'assets/music1.mp3');
else {audioElement.setAttribute('src', '../assets/music1.mp3'); }
audioElement.load();
audioElement.play();
c = readCookie("music");
if (c) audioElement.currentTime = c;

// (Update) cookie music play time when a player leaves this page, (activated by a button in gui.js)
function musicCheck() {
    if (readCookie("music")) eraseCookie("music");
    createCookie("music",audioElement.currentTime);
}
