class figure {
    constructor(type, color, pos, scalar) {
        this.vert  = figures[type].vert;
        this.face  = figures[type].face;
        this.color = (typeof color == "undefined") ? figures[type].color : color;
        this.pos   = (typeof pos   == "undefined") ? figures[type].pos   : pos;

        this.strength = figures[type].strength; // for lys

        this.scale(scalar);
        this.moveOrigo(this.pos);
        this.createHitVolume();
    }

    scale(scalar) {
        
    }

    moveOrigo(origio) {
        this.pos
    }

    createHitVolume() {

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
    },

    // El jet de el master Jacob que se llama el "Crab Wing"
    crabWing: {
        vert: [
    
            // Bottom Plane
            new vec3(3, 0.0, -2.0),
            new vec3(-3, 0.0, -2.0),
            new vec3(2, 0.0, -2.0),
            new vec3(-2, 0.0, -2.0),
    
            new vec3(2.5, 0.0, -1.0),
            new vec3(-2.5, 0.0, -1.0),
            new vec3(0.5, 0.0, -1.0),
            new vec3(-0.5, 0.0, -1.0),
    
            new vec3(4, 0.0, 0.0),
            new vec3(-4, 0.0, 0.0),
            new vec3(1, 0.0, 0.0),
            new vec3(-1, 0.0, 0.0),
    
            new vec3(1, 0.0, 1.0),
            new vec3(-1, 0.0, 1.0),
            
            // Top plane
            new vec3(2, 0.25, -2.0),
            new vec3(-2, 0.25, -2.0),
    
            new vec3(2.5, 0.25, -1.0),
            new vec3(-2.5, 0.25, -1.0),
    
            new vec3(-0.0, 0.75, -0.5),
    
            new vec3(1, 0.25, 0.0),
            new vec3(-1, 0.25, 0.0),
    
            new vec3(0.0, 0.75, 0.75)
        ],
        face: [
            // Bottom faces
    
            // Left Wing
            [0, 2, 4],
            [0, 4, 8],
            [8, 4, 12],
            [4, 10, 12],
    
            // Right Wing
            [3, 1, 5],
            [5, 1, 9],
            [5, 9, 13],
            [11, 5, 13],
    
            // Cockpit :)
            [6, 7, 10],
            [7, 11, 10],
    
            // Back end
            [10, 11, 12],
            [11, 13, 12],
    
            // Top faces
    
            // Cockpit :)
            [7, 6, 18, {r:100, g:200, b:255}],
            [6, 10, 18, {r:100, g:200, b:255}],
            [11, 7, 18, {r:100, g:200, b:255}],
            [19, 21, 18],
            [10, 19, 18],
            [21, 20, 18],
            [20, 11, 18],
            [19, 12, 21],
            [13, 20, 21],
            [12, 13, 21],
            
            // Left wing
            // Top sheet
            [0, 16, 14],
            [0, 8, 16],
            [8, 12, 16],
            [16, 12, 19],
    
            // Front sheet
            [0, 14, 2],
            [4, 2, 14],
            [4, 14, 16],
            [10, 4, 16],
            [19, 10, 16],
    
            // Right wing
            // Top sheet
            [15, 17, 1],
            [1, 17, 9],
            [17, 13, 9],
            [17, 20, 13],
    
            // Front sheet
            [1, 3, 15],
            [3, 17, 15],
            [3, 5, 17],
            [5, 20, 17],
            [5, 11, 20],
            ],
        pos: new vec3(0.0, -3.0, -10.0),
        color: {r:255, g:255, b:255, a:1}
    },

    kiran: {
        vert: [
            // body
            new vec3(-0.4,  1.2, 0),
            new vec3( 0.4,  1.2, 0),
            new vec3( 1.2, -1.2, 0),
            new vec3( 0.0, -1.6, -0.4),
    
            // back side
            new vec3(-1.2, -1.2, 0),
            new vec3( 0.0, -1.6, 0.4),
    
            // right gun
            new vec3( 1.0 , -1.2, 0),
            new vec3( 1.25,  0.4, 0),
    
            // left gun
            new vec3(-1.0 , -1.2, 0),
            new vec3(-1.25,  0.4, 0),
            
        ],
            
        face: [
            [0, 1, 5, 0],
            [0, 5, 4, 0],
            [0, 4, 3, 0],
            [0, 3, 1, 0],
    
            [1, 2, 5, 1],
            [1, 3, 2, 1],
    
            [5, 3, 4, 5],
            [5, 2, 3, 5],
    
            [7,6,2,7],
            [9,4,8,8],
    
            [7,2,6,7],
            [9,8,4,8],
        ],
        pos: new vec3(0.0, -0.6, -2.0),
        color: [245, 137, 5]
    },

    upgradesLight: {
        strength: 1,
        vert: [
            new vec3(-0.1, 0.1, 0.1),
            new vec3(0.1, 0.1, 0.1),
            new vec3(0.1, -0.1, 0.1),
            new vec3(-0.1, -0.1, 0.1),
            new vec3(-0.1, 0.1, -0.1),
            new vec3(0.1, 0.1, -0.1),
            new vec3(0.1, -0.1, -0.1),
            new vec3(-0.1, -0.1, -0.1)],
        face: [
            [0, 1, 2, 0],
            [0, 2, 3, 0],
    
            [4, 6, 5, 4],
            [4, 7, 6, 4],
    
            [1, 5, 6, 1],
            [1, 6, 2, 1],
    
            [0, 7, 4, 0],
            [0, 3, 7, 0],
        
            [0, 5, 1, 0],
            [0, 4, 5, 0],
        
            [2, 6, 7, 2],
            [2, 7, 3, 2]],
        pos: new vec3(0.0, 0.5, -5.0)
    }
};