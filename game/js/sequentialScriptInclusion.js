function sequentialScriptInclusion(scripts){
    if (scripts.length > 0){
        //grab the next item on the stack
        let scriptSrc = scripts.shift();
        let headTag = document.querySelector("head");
        
        //create a script tag with this library
        let scriptTag = document.createElement("script");
        scriptTag.src = scriptSrc;
        
        //when successful, inject the next script
        scriptTag.onload = function(e){
            console.log("---> loaded: " + e.target.src);
            sequentialScriptInclusion(scripts);
        };    
      
        //append the script tag to the <head></head>
        headTag.appendChild(scriptTag);
        console.log("injecting: " + scriptSrc);
    }

    else return;
}

// <script defer src="sequentialScriptInclusion.js" 
//     onload="sequentialScriptInclusion([
//         'cookie.js',
//         'gui.js',
//         'multiplayerUpdater.js' 
//     ]);">
// </script>
