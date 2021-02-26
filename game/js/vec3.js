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