(function() {
	"use strict";

	var twitter = require('./twitter.js');
	var embedly = require('./embedly.js');


	exports.init = function(socket, db) {
		// listen for requests
		socket.on('links', function (clientArgs) {
			console.log('socket.on(\'linkrequest\') called with arguments: ', clientArgs);
			db.getRecentLinks(function(links) {
				socket.emit('links', links);
			});
		});

	};

	exports.getApiLinks = function() {
		// get series of urls
		// check which urls in DB
		// in parallel:
		//   send those in DB to socket
		//   request remaining from embedly
		//		in parallel:
		//			save response in DB
		//			send response to socket
	};

}());