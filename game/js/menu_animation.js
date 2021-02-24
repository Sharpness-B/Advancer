let cnv1 = document.getElementById("menu_canvas");
if (cnv1) {
    let ctx = cnv1.getContext("2d"), starList = [];
    for (let i=0;i<100;i++) {
        starList.push({
            x: Math.ceil(Math.random()*innerWidth-5), 
            y: Math.ceil(Math.random()*innerHeight-5), 
            spdY: Math.ceil(Math.random()*5) 
        }); 
    }
    setInterval(() => {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,cnv1.width,cnv1.height);
        ctx.fillStyle = "white";
        for (let i=0;i<100;i++) {
            let s = starList[i];
            ctx.shadowBlur = s.spdY*4;
            ctx.shadowColor = "white";
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.spdY, 0, 2*Math.PI);
            ctx.fill();
            s.y+=s.spdY;
            if (s.y > cnv1.height) starList[i] = {x: Math.ceil(Math.random()*innerWidth-5), y: 0, spdY: Math.ceil(Math.random()*5) }
        }
    }, 30);
}