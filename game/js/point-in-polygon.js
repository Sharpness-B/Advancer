Set.union = function(s1, s2) {
    let newSet = new Set();
    s1.forEach(e => newSet.add(e));
    s2.forEach(e => newSet.add(e));
    return newSet;
}

let polygon = {
    triangulatedPolygon2Polygon: function(triangulatedPolygon) {
        // returner unike verdier
        let points = new Set();

        triangulatedPolygon.map( 
            (p) => { 
                points = Set.union(points, new Set(p));
            } 
        );

        return [...points];
    },



    giftWraping3d: function(polygon) {
        // sjekke vinkel mot alle punkter
    },



    pipConvex3D: function(triangulatedPolygon, point) {
        //                D .                                          //            
        //                 /=\\                                        //  
        //                /===\ \                                      //      
        //               /=====\' \                                    //          
        //              /=======\'' \                  P'              //                            
        //             /=========\ ' '\                                //                  
        //            /===========\''   \                              //                     
        //           /=============\ ' '  \                            //                      
        //          /===============\ P ''  \                          //                              P           
        //         /=================\' ' ' ' \                        //                           /====\---\                
        //        /===================\' ' '  ' \                      //                       /========|' '  ---\                  
        //       /=====================\' '   ' ' \ C                  //                   /=============\' '   ' '\ C                      
        //      /=======================\  '   ' /                     //               /=================|  '   ' /                   
        //     /=========================\   ' /                       //           /=====================\  '  /                 
        //    /===========================\'  /                        //       /=========================|'  /                                                  
        // A /=============================\/ B                        // A /=============================\/ B                                               
    
        // hvis volum(ABC...N) = volum(ABC....P) + volum(ABP...N) + volum(APC...N) + volum(PBC...N)
        //                     = volum(ABCP) + volum(ABPD) + volum(APCD) + volum(PBCD)

        // konstruere pyramider med trekantene og p
        // hvis volum av alle pyramidene er lik med hele figuren

        let volumePolygon = this.volumeConvex(triangulatedPolygon);
        let volumePyramides = 0;

        for (let i=0; i< triangulatedPolygon.length; i++) {
            volumePyramides += this.volumeTetrahedron(
                [...triangulatedPolygon[i], point]
            );
        }

        return volumePolygon == volumePyramides;
    },



    volumeConvex: function(triangulatedPolygon) { 
        let tmpPoint = triangulatedPolygon[0][0]; // gjør at alt kun fungerer på konvekse ting
        let V = 0;

        for (let i=0; i<triangulatedPolygon.length; i++) {
            V += this.volumeTetrahedron( [...triangulatedPolygon[i], tmpPoint] );
        }

        return V;
    },



    volumeTetrahedron: function(tetrahedron) {
        // |a×b⋅c|/6 https://math.stackexchange.com/questions/1603651/volume-of-tetrahedron-using-cross-and-dot-product

        let a = vec3.subtract( tetrahedron[0], tetrahedron[1] );
        let b = vec3.subtract( tetrahedron[2], tetrahedron[1] );
        let c = vec3.subtract( tetrahedron[3], tetrahedron[1] );

        return Math.abs( 
            vec3.dot( vec3.cross(a,b), c ) 
        )/6;
    },



    area: function(polygon) {
        // https://www.mathwords.com/a/area_convex_polygon.htm

        let det1 = 0;
        let det2 = 0;
    
        for (let n=0; n<polygon.length-1; n++) {
            det1 += polygon[n].x*polygon[n+1].y;
            det2 += polygon[n].y*polygon[n+1].x;
        }

        det1 += polygon[polygon.length-1].x*polygon[0].y;
        det2 += polygon[polygon.length-1].y*polygon[0].x;

        let area = 0.5 * (det1 - det2);
        return Math.abs(area); // rekkefølgen har betydning; derfor abs-verdi
    },



    pip2D: function(polygon, point) {
        let countPointInTriangle = 0;
    
        for (let n=1; n<polygon.length-1; n++) {
            let triangle = [
                polygon[0],
                polygon[n],
                polygon[n+1]
            ];
    
            if (this.pointInTriangle(triangle,point)) countPointInTriangle++;
        }
    
        // true hvis punktet er et odde antall ganger i trekantene
        return ! countPointInTriangle%2 == 0;
    },



    pointInTriangle: function (triangle, point) {
        //        C
        //       / \
        //      /   \
        //     /     \
        //    /   P   \    P'
        //   /         \
        // A ---------- B 
    
        // hvis areal(ABC) = areal(ABP) + areal(APC) + areal(PBC)
    
        let areaABC = this.areaOfTriangle(triangle);
    
        let areaABP = this.areaOfTriangle([
            triangle[0],
            triangle[1],
            point
        ]);
    
        let areaAPC = this.areaOfTriangle([
            triangle[0],
            point,
            triangle[2]
        ]);
    
        let areaPBC = this.areaOfTriangle([
            point,
            triangle[1],
            triangle[2]
        ]);
    
        return areaABC == areaABP + areaAPC + areaPBC;
    },



    areaOfTriangle: function (triangle) {
        let t1 = triangle[0];
        let t2 = triangle[1];
        let t3 = triangle[2];
    
        return Math.abs((t1.x * (t2.y - t3.y) + t2.x * (t3.y - t1.y)  
                       + t3.x * (t1.y - t2.y)) / 2);
    },



    polygonip: function(polygon) {},
    triangulate: function(polygon) {},
};

// let polygon = [
//     new vec3(0,0,0),
//     new vec3(2,0,0),
//     new vec3(1,2,0),
//     new vec3(1,1,1)
// ];

// let triangulatedPolygon = [
//     [polygon[0],polygon[1],polygon[3]],
//     [polygon[1],polygon[2],polygon[3]],
//     [polygon[2],polygon[0],polygon[3]],
//     [polygon[0],polygon[1],polygon[2]]
// ];

// let triangulatedPolygon = [
//     [new vec3(0,0,0),new vec3(2,0,0),new vec3(1,1,1)],
//     [new vec3(2,0,0),new vec3(1,2,0),new vec3(1,1,1)],
//     [new vec3(1,2,0),new vec3(0,0,0),new vec3(1,1,1)],
//     [new vec3(0,0,0),new vec3(2,0,0),new vec3(1,2,0)]
// ];

// console.log(polygon.pipConvex3D(
//     triangulatedPolygon, new vec3(1,1,0.5)
// ));
