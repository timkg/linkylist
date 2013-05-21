(function() {
	/**/
	"use strict";

	var io;
	var socketList = [];

	exports.start = function(server) {
		io = require('socket.io').listen(server);

		io.configure(function () {
			io.set("transports", ["xhr-polling"]);
			io.set("polling duration", 10);
			io.set('log level', 1);
		});

		return io;
	};

	exports.emit = function(event, params) {
		io.sockets.emit(event, params);
	};

	exports.sendToConnection = function(data) {
		if (!io) { throw new Error('socket.io was not instantiated upon server start-up.'); }

		io.sockets.on('connection', function(socket) {
			socketList.push(socket);
			socket.on(data.connection, function() {
				socket.emit(data.connection, {payload: data.payload});
			});
		});
	};

	exports.closeConnections = function(callback) {
		socketList.forEach(function(socket) {
			socket.disconnect();
		});
		callback();
	};

} ());