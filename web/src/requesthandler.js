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

		// uncomment to load links from twitter & embedly
//		socket.on('links', function (clientArgs) {
//			console.log('socket.on(\'links\') called with arguments: ', clientArgs);
//			exports.getApiLinks(db, socket);
//		});

		// uncomment to load example links from DB - for development, to save requests
		socket.on('links', function (clientArgs) {
			console.log('socket.on(\'links\') called with arguments: ', clientArgs);
			db.getRecentLinks(function(links) {
				socket.emit('links', links);
			});
		});
		console.log('socket.io reqeust handler initialized');
	};

	exports.getApiLinks = function(db, socket) {
		twitter.searchFor('javascript', function(responseData) {
			var urls = twitter.getListOfUrlsFromApiResponse(responseData);
			embedly.getOembedForListOfUrls(urls, function(response) {
				socket.emit('links', response);
				// TODO - save new responses in DB
			});
		});
	};

}());