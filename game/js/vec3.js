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

    static add(vec1, vec2)
    {
        return(new vec3(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z));
    }

    static subtract(vec1, vec2)
    {
        return(new vec3(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z));
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

    divide(scale)
    {
        if(scale instanceof vec3)
        {
            return(this.x / scale.x + this.y / scale.y + this.z / scale.z);
        }
        else
        {
            this.x /= scale;
            this.y /= scale;
            this.z /= scale;
        }   
    }

    normalize()
    {
        let len = this.length();
        this.x /= len;
        this.y /= len;
        this.z /= len;
    }

    transform(mat)
    {
        let x = mat[0][0]*this.x +
                mat[0][1]*this.y +
                mat[0][2]*this.z;

        let y = mat[1][0]*this.x +
                mat[1][1]*this.y +
                mat[1][2]*this.z;

        let z = mat[2][0]*this.x +
                mat[2][1]*this.y +
                mat[2][2]*this.z;

        this.x = x;
        this.y = y;
        this.z = z;
    }

    static dot(v, u)
    {
        return v.x * u.x + v.y * u.y + v.z * u.z;
    }

    static cross(v, u)
    {
        return new vec3(
            v.y * u.z - v.z * u.y,
          -(v.x * u.z - v.z * u.x),
            v.x * u.y - v.y * u.x
        );
    }

    static angle(v, u) 
    {
        return Math.acos(
            this.dot(v, u) / ( v.length() * u.length() )
        );
    }
}
