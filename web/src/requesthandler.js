(function() {
	"use strict";

	var twitter = require('./twitter');
	var embedly = require('./embedly');

	exports.init = function(socket, db) {
		// send once on start
		// TODO - one collection for each searchterm
		db.getRecentLinks(function(links) {
			socket.emit('links', links);
		});

		socket.on('links', function (clientArgs) {
			console.log('socket.on(\'links\') called with arguments: ', clientArgs);
			exports.getApiLinks(db, socket);
		});
		console.log('socket.io reqeust handler initialized');
	};

	exports.getApiLinks = function(db, socket) {
		twitter.searchFor('javascript', function(responseData) {
			var urls = twitter.getListOfUrlsFromApiResponse(responseData);
			embedly.getOembedForListOfUrls(urls, function(response) {
				socket.emit('links', response);
			});
		});
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