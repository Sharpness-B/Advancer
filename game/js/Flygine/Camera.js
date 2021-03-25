class Camera
{
    fov;
    near;
    far;
    position;
    direction;
    
    constructor(position, direction, fov, near, far)
    {
        this.fov = fov;
        this.near = near;
        this.far = far;
        this.position = position;
        this.direction = direction;
    }

    get viewMatrix()
    {
        return([
            [1/Math.tan(this.fov/2), 0, 0,                   0],
            [0, 1/Math.tan(this.fov/2), 0,                   0], 
            [0, 0, (this.far+this.near)/(this.far-this.near),       -1],
            [0, 0, (2 * this.far * this.near)/(this.far-this.near),  0]
        ]);
    }

    get cameraMatrix()
    {
        let p = this.position;
        let d = this.direction;

        // (T)ranslate to origin
        let T = [   [   1,    0,    0,    0],
                [   0,    1,    0,    0],
                [   0,    0,    1,    0],
                [-1*p.x, -1*p.y, -1*p.z,    1]   ];

        // (R)otate so -z is forward
        let theta = Math.atan(d.x/d.z);
        let Ry = [      [   Math.cos(theta),                  0,    Math.sin(theta),                  0],
                        [                 0,                  1,                  0,                  0],
                        [-1*Math.sin(theta),                  0,    Math.cos(theta),                  0],
                        [                 0,                  0,                  0,                  1]    ];;

        let phi = Math.atan(d.y/Math.sqrt( d.x**2 + d.z**2 ));
        let Rx = [  [                 1,                  0,                  0,                  0],
                    [                 0,    Math.cos(  phi), -1*Math.sin(  phi),                  0],
                    [                 0,    Math.sin(  phi),    Math.cos(  phi),                  0],
                    [                 0,                  0,                  0,                  1]    ];

        // Combination of Rx and Ry to R
        let R = Matrix.multiply(Rx, Ry);
        
        // (C)ameraMatrix
        let C = Matrix.multiply(T, R);
        return(C);
    }

    project(vec)
    {
        let C = this.cameraMatrix;
        let V = this.viewMatrix;
        let CV = Matrix.multiply(C, V);

        let p4 = Matrix.multiply(CV, Matrix.v3tom(vec)); // Egentlig bytte CV og Matrix.v3tom(vec)
        
        let w = p4[3][0];
        
        let p3 = new vec3(p4[0][0]/w,
                          p4[1][0]/w,
                          p4[2][0]/w);

        return new vec2(p3.x/p3.z, p3.y/p3.z);
    }
}