(function() {
	/**/
	"use strict";

	var EmbedlyModel = require('./models/Embedly').compileModel();
	var TweetModel = require('./models/Tweet').compileModel();
	var LinkModel = require('./models/Link').compileModel();

	var uuid = require('node-uuid');

	exports.onResponse = function(listOfUrls, onDbCallback) {

		LinkModel
			.find({ url: { $in: listOfUrls } })
			.populate('_embedly')
			.exec(function(err, results) {
				if (err) { throw err; }
				var clientSocketUUID;
				if( listOfUrls.length > results.length ) {
					clientSocketUUID = uuid.v1();
				}
				exports.sendDbResults(results, listOfUrls, onDbCallback, clientSocketUUID);
				exports.startStreamForRemaining(results, listOfUrls, clientSocketUUID);
			})
	};

	exports.sendDbResults = function(resultsFromDb, urlsFromTwitter, callback, optionalSocketUUID) {

		var missingFromDb = [];
		urlsFromTwitter.map(function(twitterUrl) {
			var existsInDb = false;
			resultsFromDb.forEach(function(dbResult) {
				if (dbResult.url === twitterUrl) { existsInDb = true; }
			});
 			if (!existsInDb) { missingFromDb.push(twitterUrl); }
		});

		callback({
			resultsWithPreview: resultsFromDb,
			resultsWithoutPreview: missingFromDb,
			socketUUID: optionalSocketUUID
		});
	};

	exports.startStreamForRemaining = function(results, expected, socketUUID) {
		if( !socketUUID ) { return; }
		// start embedly request for remaining
		// on response, init socket.io remainingEmbedsAreYetToComeUUID session. On connection, send links to client.
		// save remaining data (links + embedly) in DB
	};

} ());