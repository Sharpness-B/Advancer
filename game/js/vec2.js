class vec2
{
    x;
    y;

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    toString()
    {
        return("[" + this.x + ", " + this.y + "]");
    }

    get length()
    {
        return(Math.sqrt(this.x**2 + this.y**2));
    }

    add(vector)
    {
        this.x += vector.x;
        this.y += vector.y;
    }

    subtract(vector)
    {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    multiply(scale)
    {
        if(scale instanceof Victor)
        {
            return(this.x * scale.x + this.y * scale.y);
        }
        else
        {
            this.x *= scale;
            this.y *= scale;
        }
    }

    normalize()
    {
        if(this.x != 0 && this.y != 0)
        {
            let len = this.length;
            this.x /= len;
            this.y /= len;
        }
        else
        {
            this.x == 0;
            this.y == 0;
        }
    }

    clone()
    {
        return(new Victor(this.x, this.y));
    }

    rotate(radians)
    {
        let x = this.x * Math.cos(radians) - this.y * Math.sin(radians);
        let y = this.x * Math.sin(radians) + this.y * Math.cos(radians);
        this.x = x;
        this.y = y;
    }

    angle(vector)
    {
        return(Math.acos(this.multiply(vector) / this.length * vector.length));
    }

    isOrthogonal(vector)
    {
        if(this.multiply(vector) == 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    isParallell(vector)
    {
        if(this.x / this.y == vector.x / vector.y)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    tov3(z)
    {
        return new vec3(this.x, this.y, z);
    }
}
