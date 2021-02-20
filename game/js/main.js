let objects = [];

let ship = {
    brand: "Tesla",
    model: "Roadster",
    year: 2008,
    boundingvolume: [[1,3,4], [3,4,2], [2,10,4]]
};

function pipeline() {
    let multiplayer = true;
    
    if (multiplayer) updateObjects("../db/updater.php", ship);
    else             ;

    console.log(objects)
}

setInterval(pipeline, 500);  
