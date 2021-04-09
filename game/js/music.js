/* MUSIC */
let loc = document.location.href.split("/");
var audioElement = new Audio('button.mp3');
if (loc[loc.length-1].toString() == "index.html") audioElement.src= 'assets/music1.mp3';
else {audioElement.src = '../assets/music1.mp3'; }
audioElement.load();
audioElement.play();
c = cookie.readCookie("music");
if (c) audioElement.currentTime = c;

// (Update) cookie music play time when a player leaves this page, (activated by a button in gui.js)
function musicCheck() {
    if (cookie.readCookie("music")) cookie.eraseCookie("music");
    cookie.createCookie("music",audioElement.currentTime,10);
}
audioElement.volume = 0.7;