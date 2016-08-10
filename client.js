var net = require('net');

const server_addr = "185.95.17.127";
const server_port = 25712;

var message_amount = process.argv[2] | 1;

var client = new net.Socket();

client.connect(server_port, server_addr, function() {
	console.log('Connected');
	
	sendMessage();
});

client.on('data', function(data) {
	if (data == "ready"){
		if (message_amount > 0)
			sendMessage();
	}
});

client.on('close', function() {
	console.log('Connection closed');
});

function sendMessage() {
	client.write(Date.now() + "", function (err){
		if (message_amount <= 0)
			client.end();
	});

	message_amount -= 1;
}