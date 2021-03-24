class vec3
{
    x;
    y;
    z;

    constructor(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toString()
    {
        return("[" + this.x + ", " + this.y + ", " + this.z + "]");
    }

    length()
    {
        return(Math.sqrt(this.x**2 + this.y**2 + this.z**2));
    }

    add(vector)
    {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }

    subtract(vector)
    {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
    }

    multiply(scale)
    {
        if(scale instanceof vec3)
        {
            return(this.x * scale.x + this.y * scale.y + this.z * scale.z);
        }
        else
        {
            this.x *= scale;
            this.y *= scale;
            this.z *= scale;
        }
    }

    normalize()
    {
        let len = this.length();
        this.x /= len;
        this.y /= len;
        this.z /= len;
    }
}




var pressKey = function(event) {
    
}
const unpressKey = function(event) {
    
}
var screenBoxCX = window.innerWidth / 2;
var screenBoxCY = window.innerHeight / 2;

const getMouseInGeneral = function(event) {
    screenBoxCX = window.innerWidth / 2;
    screenBoxCY = window.innerHeight / 2;
    var mouseClientX = event.clientX - screenBoxCX;
    var mouseClientY = event.clientY - screenBoxCY;

    
}


const getMouseDown = function(mouse) {
    //var mousepress = 0;
    //document.getElementById("click").innerHTML = mouse.button;
    switch (mouse.button) {
        case 1:
            mousepress[1] = 1
            break;
        case 0:
            mousepress[0] = 1
            break;
        case 2:
            mousepress[2] = 1
            break;
    }
}

const getMouseUp = function(mouse) {
        switch (mouse.button) {
        case 1:
            mousepress[1] = 0
            break;
        case 0:
            mousepress[0] = 0
            break;
        case 2:
            mousepress[2] = 0
            break;
    }
}


function sendMouse(x, y) {

}

document.addEventListener('mousemove', getMouseInGeneral);
document.addEventListener('keydown', pressKey);
document.addEventListener('keyup', unpressKey);
document.addEventListener('mousedown', getMouseDown);
document.addEventListener('mouseup', getMouseUp);