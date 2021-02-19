let objects = {};
let data = {point: [1,2,3]};

function pipeline() {
    updateObjects("db/retriever.php", data);
    console.log(objects);
}

setInterval(pipeline, 50);
