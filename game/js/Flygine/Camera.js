function cot(x)
{
    return(Math.cos(x)/Math.sin(x));
}

class Camera
{
    a;
    n;
    f;
    projMatrix;
    
    constructor(alpha, near, far)
    {
        this.a = alpha;
        this.n = near;
        this.f = far;
        this.projMatrix = new Matrix([[cot(alpha/2), 0, 0, 0], 
                                      [0, cot(alpha/2), 0, 0],
                                      [0, 0, (far+near)/(far-near), (2*far*near)/(far-near)],
                                      [0, 0, -1, 0]]);
    }
}

