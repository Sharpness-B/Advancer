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
// Read cookie playtime
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
// Make cookie
function createCookie(name,value) {
    let date = new Date();
    date.setTime(date.getTime() + (10 *1000));
    let expires = "; expires=" + date.toGMTString();
    document.cookie = name + "=" + value + expires + "; path=/";
}
//Remove cookie
function eraseCookie(name) {
    createCookie(name,"",-1);
}