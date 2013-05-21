(function () {
	/**/
	"use strict";

	exports.start = function(io) {
		io.sockets.on('connection', function(socket) {
			socket.on('join', function(user) {
				io.sockets.emit('announcement', user.name + ' joined.');
			});
			socket.on('text', function(msg) {
				io.sockets.emit('text', msg);
			});
		});
	};

}());