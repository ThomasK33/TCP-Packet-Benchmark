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

var chunk = createChunkWithSize(100000);

client.on('data', function(data) {
	var d = parseInt(data.toString().split("#")[0]);

	// var time_delta = (Date.now() - d)/2;
	var time_delta = (Date.now() - d);

	total_time += time_delta;
	message_count += 1;
	avrg_time = total_time / message_count;

	console.log("Time elapsed for one package: " + time_delta);

	message_amount -= 1;

	if (message_amount <= 0) {
		client.end();
	}
	else
	{
		sendMessage();
	}
});

client.on('close', function() {
	console.log('Connection closed');
});

function printResults() {
	console.log("\n--- Results ---\n");

	console.log("Total time elapsed: " + total_time);
	console.log("Number of packets received: " + message_count);
	console.log("Average time for one packet to be sent: " + avrg_time);

	console.log("\n---\n");
}

function sendMessage() {
	client.write(Date.now() + "#" + chunk);
}

function createChunkWithSize(size) {
	var str = "";

	for (var i = 0; i < (size / 2); i++)
		str.concat("a");

	return str;
}

function exitHandler(options, err) {
    if (options.cleanup) printResults();
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));