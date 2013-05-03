(function() {
	/**/
	"use strict";

	var LinkModel = require('./models/Link').compileModel();
	var twitter = require('./services/twitter');

	var uuid = require('node-uuid');

	exports.onResponse = function(tweets, callback) {
		var listOfUrls = twitter.extractUrlsFromTweets(tweets.items);
		LinkModel
			.find({ url: { $in: listOfUrls } })
			.populate('_embedly')
			.exec(function(err, resultsFromDb) {
				if (err) { throw err; }
				var tempIdForSocketIoSessionWithClient; // used to create channel with client for this specific request
				if( listOfUrls.length > resultsFromDb.length ) {
					tempIdForSocketIoSessionWithClient = uuid.v1();
				}
				var urlsNotInDb = exports.extractUrlsNotInDbFromListOfUrls(resultsFromDb, listOfUrls);
				callback({
					resultsWithPreview: resultsFromDb,
					resultsWithoutPreview: urlsNotInDb,
					socketUUID: tempIdForSocketIoSessionWithClient // optional here, can be undefined
				});
			});
	};

	exports.onMissingLinks = function(payload) {

	};

	exports.extractUrlsNotInDbFromListOfUrls = function(resultsFromDb, listOfUrls) {
		var missingFromDb = [];
		listOfUrls.map(function(url) {
			var existsInDb = false;
			resultsFromDb.forEach(function(dbResult) {
				if (dbResult.url === url) { existsInDb = true; }
			});
			if (!existsInDb) { missingFromDb.push({url: url}); }
		});

		return missingFromDb;
	};

} ());