function socketLogic(socket) {
	socket.on("data", function (data){
		socket.write(data);
	});
}

exports.socketLogic = socketLogic;