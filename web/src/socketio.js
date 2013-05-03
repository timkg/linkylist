var io;

exports.init = function(server) {

	io = require('socket.io').listen(server);

	io.configure(function () {
		io.set("transports", ["xhr-polling"]);
		io.set("polling duration", 10);
		io.set('log level', 1);
	});

};