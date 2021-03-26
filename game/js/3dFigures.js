class figure {
    constructor(type, scalar, color, pos) {
        this.vert  = figures[type].vert;
        this.face  = figures[type].face;
        this.color = (typeof color == "undefined") ? figures[type].color : color;
        this.pos   = (typeof pos   == "undefined") ? figures[type].pos   : pos;

        this.scale(scalar)
    }

    scale(scalar) {
        
    }

    moveOrigo(origio) {
        
    }
}



let figures = {
    cube: {
        vert: [
            new vec3(-0.6,  0.6,  0.6),
            new vec3( 0.6,  0.6,  0.6),
            new vec3( 0.6, -0.6,  0.6),
            new vec3(-0.6, -0.6,  0.6),
            new vec3(-0.6,  0.6, -0.6),
            new vec3( 0.6,  0.6, -0.6),
            new vec3( 0.6, -0.6, -0.6),
            new vec3(-0.6, -0.6, -0.6)
        ],
            
        face: [
            [0, 1, 2],
            [0, 2, 3],
              
            [4, 6, 5],
            [4, 7, 6],
               
            [1, 5, 6],
            [1, 6, 2],
              
            [0, 7, 4],
            [0, 3, 7],
              
            [0, 5, 1],
            [0, 4, 5],
              
            [2, 6, 7],
            [2, 7, 3] 
        ],

        pos: new vec3(0.0, -0.8, -3.0),
        color: {r:255, g:255, b:255, a: 1}
    },

    icosahedron: {
        vert: [     
            new vec3( 1.05,  0,     0.53),
            new vec3( 0.32,  1,     0.53),
            new vec3( 0,     0,     1.18),
            new vec3(-0.85,  0.62,  0.53),
            new vec3(-0.85, -0.62,  0.53),
            new vec3( 0.32, -1,     0.53),
            new vec3( 0.85,  0.62, -0.53),
            new vec3(-0.32,  1,    -0.53),
            new vec3(-1.05,  0,    -0.53),
            new vec3(-0.32, -1,    -0.53),
            new vec3( 0.85, -0.62, -0.53),
            new vec3( 0,     0,    -1.18)
        ],

        face: [
            [0,  1,  2 ],
            [1,  3,  2 ],
            [3,  4,  2 ],
            [4,  5,  2 ],
            [5,  0,  2 ],
            [6,  1,  0 ],
            [6,  7,  1 ],
            [7,  3,  1 ],
            [7,  8,  3 ],
            [8,  4,  3 ],
            [8,  9,  4 ],
            [9,  5,  4 ],
            [9,  10, 5 ],
            [10, 0,  5 ],
            [10, 6,  0 ],
            [11, 7,  6 ],
            [11, 8,  7 ],
            [11, 9,  8 ],
            [11, 10, 9 ],
            [11, 6,  10] 
        ],

        pos: new vec3(0,0,0),
        color: {r:255, g:255, b:255, a: 1}
    }
};