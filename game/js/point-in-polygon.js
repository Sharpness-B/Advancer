let pip = {
    pipConvex3D: function(polygon) {
        //                D .
        //                 /=\\
        //                /===\ \
        //               /=====\' \
        //              /=======\'' \                  P'
        //             /=========\ ' '\
        //            /===========\''   \ 
        //           /=============\ ' '  \
        //          /===============\ P ''  \
        //         /=================\' ' ' ' \
        //        /===================\' ' '  ' \
        //       /=====================\' '   ' ' \ C
        //      /=======================\  '   ' /
        //     /=========================\   ' /
        //    /===========================\'  /
        // A /=============================\/ B
    
        // hvis volum(ABC...N) = volum(ABC....P) + volum(ABP...N) + volum(APC...N) + volum(PBC...N)
    },

    volume: function(polygon) {},

    pip3D: function(polygon, point) {
        // NB: fungerer kun om punktet er synlig fra alle koordinataksene
        console.warn("pip.pip3 does only work if the point is visible from all three coordinate axis")
        // projsjektere til plan fra 3 ulike perspektiv
        // hvis innenfor begge <=> punktet er innenfor plygonet
    
        // xy-planet
        let xyPolygon = polygon.map(function(val) {
            return val.slice(0, -1);
        });
        let xyPoint = [point[0], point[1]];
        let isInXY = this.pip2D(xyPolygon, xyPoint);
        
        // yz-planet
        let yzPolygon = polygon.map(function(val) {
            return val.slice(1, 3);
        });
        let yzPoint = [point[1], point[2]];
        let isInYZ = this.pip2D(yzPolygon, yzPoint);

        // xz-planet
        // let xzPolygon = polygon.map(function(val) {
        //     return val.slice();???
        // });
        polygonClone = [...polygon];
        polygonClone.forEach(a => a.splice(3, 1));
        xzPolygon = polygonClone;

        let xzPoint = [point[0], point[2]];
        let isInXZ = this.pip2D(xzPolygon, xzPoint);
    
        return isInXY && isInYZ && isInXZ;
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
        let [x1, y1] = triangle[0];
        let [x2, y2] = triangle[1];
        let [x3, y3] = triangle[2];
    
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1)  
                       + x3 * (y1 - y2)) / 2);
    },

    area: function(polygon) {},
};

// // 2D TEST
// let a = [
//     [0,0],
//     [0,1],
//     [1,2],
//     [2,1],
//     [1,-1]
// ];
// 
// let b = [1,1];
// let c = [10,10];
// 
// console.log(pip.pip2D(a,b));

// // 3D TEST
// let a = [
//     [0,0,0],
//     [2,0,0],
//     [1,2,0],
//     [1,1,2]
// ];

// let b = [1,1,1];

// console.log(pip.pip3D(a,b))