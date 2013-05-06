(function() {
	/**/
	"use strict";

	var fs = require('fs');

	var server = require('http').createServer();
	var socketio = require('../../src/socketio').init(server);

	exports.startTestServer = function(callback) {

		server.listen(8889, function() {
			socketio.sendToConnection({
				connection: '123',
				payload: [{url: 'http://here.i/com'}]
			});
			callback();
		});
	};

	exports.stopTestServer = function(callback) {
		socketio.closeConnections(function() {
			server.close(callback);
		});
	};

} ());