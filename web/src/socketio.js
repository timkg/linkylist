(function() {
	/**/
	"use strict";

	var io;
	var socketList = [];

	exports.init = function(server) {
		io = require('socket.io').listen(server);

		io.configure(function () {
			io.set("transports", ["xhr-polling"]);
			io.set("polling duration", 10);
			io.set('log level', 1);
		});

		return this;
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

	exports.sendMissingPreviews = function(data, response) {
		var linksWithoutEmbed = [];
		var linksWithEmbed = [];
		data.payload.map(function(link) {
			if (!link._embedlyExtract) {
				linksWithoutEmbed.push(link.url);
			} else {
				linksWithEmbed.push(link.url); // just used for testing
			}
		});

	//		EmbedlyExtractModel.getExtractForUrls(linksWithoutEmbed, function(embeds) {
	//
	//		});
	};

	exports.closeConnections = function(callback) {
		socketList.forEach(function(socket) {
			socket.disconnect();
		});
		callback();
	};

} ());