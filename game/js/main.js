let objects = [];

let ship = {
    brand: "Tesla",
    model: "Roadster",
    year: 2008
};

function pipeline() {
    updateObjects("../db/retriever.php", ship);
    console.log(objects)
}

setInterval(pipeline, 500);  
