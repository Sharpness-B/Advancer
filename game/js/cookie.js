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