(function () {
	/**/
	"use strict";
	// useful hints here:
	// http://liamkaufman.com/blog/2012/01/28/testing-socketio-with-mocha-should-and-socketio-client/

	var io = require('socket.io-client');
	var SOCKET_URL = 'http://localhost:8889';

	exports.test_acceptsClientConnections = function(test) {
		var CONNECTION_ID_1 = '123';
		var client = io.connect(SOCKET_URL);

		client.on('connect', function(data) {
			client.emit(CONNECTION_ID_1);
			client.on(CONNECTION_ID_1, function(data) {
				test.equals(data.payload[0].url, 'http://here.i/com', 'socket streamed correct link to client');
				client.disconnect();
				test.done();
			});
		});
	};

	// how can I test this? not with my current code setup. But it works correctly.
//	exports.test_onlySendsDataToCorrectClient = function(test) {
//		var CONNECTION_ID_1 = '123';
//		var CONNECTION_ID_2 = '234';
//		var CONNECTION_ID_3 = '345';
//
//		var client1 = io.connect(SOCKET_URL);
//		var client2 = io.connect(SOCKET_URL);
//		var client3 = io.connect(SOCKET_URL);
//
//		client1.on('connect', function(data) {
//			client1.emit(CONNECTION_ID_1);
//			client1.on(CONNECTION_ID_1, function(data) {
//				console.log(data);
//			});
//		});
//
//		client2.on('connect', function(data) {
//			client2.emit(CONNECTION_ID_2);
//			client2.on(CONNECTION_ID_2, function(data) {
//				console.log(data);
//			});
//		});
//
//		client3.on('connect', function(data) {
//			client3.emit(CONNECTION_ID_3);
//			client3.on(CONNECTION_ID_3, function(data) {
//				console.log(data);
//			});
//		});
//
//	};

} ());