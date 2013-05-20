(function () {
	/**/
	"use strict";

	exports.start = function(io) {
		io.sockets.on('connection', function(socket) {
			socket.on('join', function(user) {
				console.log('join');
				io.sockets.emit('announcement', user.name + ' joined.');
			});
			socket.on('text', function(msg) {
				console.log('text');
				socket.emit('text', user.name, msg);
			});
		});
	}

}());