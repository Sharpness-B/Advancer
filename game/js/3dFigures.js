let figures = {
    scale: function(scalar, figure) {
        return figure;
    },

    moveOrigo: function(origio, figure) {
        return figure;
    },

    cube = {
        vert: [
            new vec3(-0.6, 0.6, 0.6),
            new vec3(0.6, 0.6, 0.6),
            new vec3(0.6, -0.6, 0.6),
            new vec3(-0.6, -0.6, 0.6),
            new vec3(-0.6, 0.6, -0.6),
            new vec3(0.6, 0.6, -0.6),
            new vec3(0.6, -0.6, -0.6),
            new vec3(-0.6, -0.6, -0.6)
        ],
            
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
            [2, 7, 3, 2]
        ],

        pos: new vec3(0.0, -0.8, -3.0),
        color: {r:255, g:255, b:255}
    },

    icosahedron: {}
};