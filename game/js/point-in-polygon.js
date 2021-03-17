let pip = {
    
};



function pip3D(polygon, point) {
    // projsjektere til plan fra 2 ulike perspektiv
    // hvis innenfor begge <=> punktet er innenfor plygonet

    // xy-planet
    let xyPolygon = polygon.map(function(val) {
        return val.slice(0, -1);
    });

    let xyPoint = [point[0], point[1]];

    let isInXY = pip2D(xyPolygon, xyPoint);
    

    // yz-planet
    let yzPolygon = polygon.map(function(val) {
        return val.slice(1, 3);
    });

    let yzPoint = [point[0], point[1]];

    let isInYZ = pip2D(yzPolygon, yzPoint);

    return isInXY && isInYZ;
}

function pip2D(polygon, point) {
    let countPointInTriangle = 0;

    for (let n=1; n<polygon.length-1; n++) {
        let triangle = [
            polygon[0],
            polygon[n],
            polygon[n+1]
        ];

        if (pointInTriangle(triangle,point)) countPointInTriangle++;
    }

    // true hvis punktet er et odde antall ganger i trekantene
    return ! countPointInTriangle%2 == 0;
}

function pointInTriangle(triangle, point) {
    //        C
    //       / \
    //      /   \
    //     /     \
    //    /   P   \    P'
    //   /         \
    // A ---------- B 

    // hvis areal(ABC) = areal(ABP) + areal(APC) + areal(PBC)

    let areaABC = areaOfTriangle(triangle);

    let areaABP = areaOfTriangle([
        triangle[0],
        triangle[1],
        point
    ]);

    let areaAPC = areaOfTriangle([
        triangle[0],
        point,
        triangle[2]
    ]);

    let areaPBC = areaOfTriangle([
        point,
        triangle[1],
        triangle[2]
    ]);

    return areaABC == areaABP + areaAPC + areaPBC;
}


function areaOfTriangle(triangle) {
    let [x1, y1] = triangle[0];
    let [x2, y2] = triangle[1];
    let [x3, y3] = triangle[2];

    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1)  
                   + x3 * (y1 - y2)) / 2);
}

function area(polygon) {
    // http://www.mathwords.com/a/area_convex_polygon.htm
}

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
// console.log(pip2D(a,b));

// // 3D TEST
// let a = [
//     [0,0,0],
//     [2,0,0],
//     [1,2,0],
//     [1,1,2]
// ];

// let b = [1,1,1];

// console.log(pip3D(a,b))