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



    convexTriangulation: function(fig) {
        // sjekke vinkel mot alle punkter // når skipet flytter seg flytter boksen seg

        /* gift wraping
        
        1. finn et triangel
        2. ta to av punktene og bøy oppover ny flate til den treffer punkt
        3. vi har et nytt triangel og gjentar
        */
        

        let triangles = [];
        let points    = fig.vert;
        let nPoints   = points.length;
  
        while (false) {
            let previousTriangle = triangles[triangles.length - 1];
            let previousNormalVec;

            let a = previousTriangle[0];
            let b = previousTriangle[1];

            let angle = Math.pi;
            let c;

            for (let i=0; i<nPoints; i++) {
                let candidate = points[i];
                let candidateAngle;
                let candidateNormalVec;

                if (candidateAngle < angle) {
                    c = candidate;
                }
            }

            triangles.push( [a,b,c] );

            break;
        }
        

        /* paint dipping

        Dyppe figuren i maling

        1 punktet med minst z er det første punktet i den første trekanten
        2 rotere figuren slik at punktene har samme z
        3 punktet med tredje minst z er det siste punktet i trekanten

        4 roter figuren 
        
        */
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



    normalVecTriangle: function(triangel) {
        let a = new vec3(
            triangel[0],
            triangel[0],
            triangel[0]
        );
        let b = new vec3(
            triangel[1],
            triangel[1],
            triangel[1]
        );
        let c = new vec3(
            triangel[2],
            triangel[2],
            triangel[2]
        );

        return vec3.cross(
            vec3.subtract(a,b),
            vec3.subtract(a,c)
        );
    },



    polygonip: function(polygon) {},
    triangulate: function(polygon) {}
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
