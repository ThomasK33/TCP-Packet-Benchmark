// Keep track of the chat clients

var message_count = 0;
var total_time = 0;
var avrg_time = 0;

function socketLogic(socket) {
	// // Identify this client
	// socket.name = socket.remoteAddress + ":" + socket.remotePort 

 	//  	// Put this new client in the list
 	//  	clients.push(socket);

 	//  	// Send a nice welcome message and announce
 	//  	socket.write("Welcome " + socket.name + "\n");
 	//  	broadcast(socket.name + " joined the chat\n", socket);

 	//  	// Handle incoming messages from clients.
 	//  	socket.on('data', function (data) {
 	//  		broadcast(socket.name + "> " + data, socket);
 	//  	});

 	//  	// Remove the client from the list when it leaves
 	//  	socket.on('end', function () {
 	//  		clients.splice(clients.indexOf(socket), 1);
 	//  		broadcast(socket.name + " left the chat.\n");
 	//  	});

 	//  	// Send a message to all clients
 	//  	function broadcast(message, sender) {
 	//  		clients.forEach(function (client) {
 	//    		// Don't want to send it to sender
 	//      		if (client === sender) return;
 	//      		client.write(message);
 	//  		});
 	//    	// Log it to the server output too
 	//    	process.stdout.write(message)
	//    }

	socket.on("data", function (data){
		var d = parseInt(data);

		var time_delta = Date.now() - d;

		total_time += time_delta;
		message_count += 1;
		avrg_time = total_time / message_count;

		console.log("Time elapsed for one package: " + time_delta);

		socket.write("ready");
	});

	socket.on("end", function (){
		console.log("\n--- Results ---\n");

		console.log("Total time elapsed: " + total_time);
		console.log("Number of packets received: " + message_count);
		console.log("Average time for one packet to be sent: " + avrg_time);

		console.log("\n---\n");
	});
}

exports.socketLogic = socketLogic;