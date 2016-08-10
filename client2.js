var net = require('net');

const server_addr = "185.95.17.127";
const server_port = 25712;

var message_amount = process.argv[2] | 1;

var client = new net.Socket();

client.connect(server_port, server_addr, function() {
	console.log('Connected');
	
	sendMessage();
});

var message_count = 0;
var total_time = 0;
var avrg_time = 0;

client.on('data', function(data) {
	var d = parseInt(data);

	var time_delta = (Date.now() - d)/2;

	total_time += time_delta;
	message_count += 1;
	avrg_time = total_time / message_count;

	console.log("Time elapsed for one package: " + time_delta);
});

client.on('close', function() {
	console.log('Connection closed');
});

function sendMessage() {
	for (var i = 0; i < message_amount; i += 1)
		client.write(Date.now() + "");

	client.end();
}