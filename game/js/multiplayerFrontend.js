const socket = io("http://127.0.0.1:8080/");

socket.on("init", handleInit);

function handleInit(data) {
    console.log(data);
}