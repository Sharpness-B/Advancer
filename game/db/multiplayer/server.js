let app = require("express")();
let server = require("http").Server(app);
let io = require("socket.io")(server, {origins:["*:*"]});
// io.set("origins", "*:*");

io.on("connection", client => {
    client.emit("init", {data:"hello world"});
});

io.listen(8080);