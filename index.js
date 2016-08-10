// Load the TCP Library
const net = require('net');

const logic = require("./lib/logic.js");

const server_port = 25712;

// Start a TCP Server
net.createServer(function (socket) {
  logic.socketLogic(socket);
}).listen(server_port);

console.log("Benchmark server running at port " + server_port + "\n");