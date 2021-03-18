// Read cookie playtime
function readCookie(name) {
    // let nameEQ = name + "=";
    // let ca = document.cookie.split(';');
    // for(let i=0;i < ca.length;i++) {
    //     let c = ca[i];
    //     while (c.charAt(0)==' ') { c = c.substring(1,c.length); }

    //     if (c.indexOf(nameEQ) == 0) {
    //         return c.substring(nameEQ.length,c.length);
    //     }
    // }
    // return null;

    if (document.cookie.indexOf(name) > -1) {
        return document.cookie.split(name)[1].split("; ")[0].substr(1)
    } 
    
    else {
        return null;
    }
}

// Make cookie
function createCookie(name,value,seconds) {
    let date = new Date();
    date.setTime(date.getTime() + seconds*1000);
    let expires = "; expires=" + date.toGMTString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

//Remove cookie
function eraseCookie(name) {
    createCookie(name,null,-1);
}
