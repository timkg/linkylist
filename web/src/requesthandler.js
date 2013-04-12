(function() {
	"use strict";

	var twitter = require('./twitter.js');
	var embedly = require('./embedly.js');


	exports.init = function(socket, db) {
		// listen for requests
		socket.on('req:links', function (clientArgs) {
			console.log('socket.on(\'links\') called with arguments: ', clientArgs);
			db.getRecentLinks(function(links) {
				socket.emit('res:links', links);
			});
		});
		console.log('socket.io reqeust handler initialized');
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