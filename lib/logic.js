// Keep track of the chat clients

var message_count = 0;
var total_time = 0;
var avrg_time = 0;

function socketLogic(socket) {
	socket.on("data", function (data){
		var d = parseInt(data);

		var time_delta = Date.now() - d;

		total_time += time_delta;
		message_count += 1;
		avrg_time = total_time / message_count;

		// console.log("Time elapsed for one package: " + time_delta);

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