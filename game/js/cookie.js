let cookie = {
    readCookie: function(name) {
        if (document.cookie.indexOf(name) > -1) {
            return document.cookie.split(name)[1].split("; ")[0].substr(1)
        } 
        
        else {
            return null;
        }
    },

    createCookie: function(name,value,seconds) {
        let date = new Date();
        date.setTime(date.getTime() + seconds*1000);
        let expires = "; expires=" + date.toGMTString();
        let SameSite = "; SameSite=Lax";
        document.cookie = name + "=" + value + SameSite + expires + "; path=/";
    },

    eraseCookie: function(name) {
        this.createCookie(name,null,-1);
    }
};
