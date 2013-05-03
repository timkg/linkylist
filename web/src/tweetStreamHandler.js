(function() {
	/**/
	"use strict";

	var EmbedlyModel = require('./models/Embedly').compileModel();
	var TweetModel = require('./models/Tweet').compileModel();
	var LinkModel = require('./models/Link').compileModel();

	var uuid = require('node-uuid');

	exports.onResponse = function(listOfUrls, onDbCallback, socketIoCallback) {

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
				onDbCallback({
					resultsWithPreview: resultsFromDb,
					resultsWithoutPreview: urlsNotInDb,
					socketUUID: tempIdForSocketIoSessionWithClient // optional here, can be undefined
				});
				if(socketIoCallback) { socketIoCallback(urlsNotInDb, tempIdForSocketIoSessionWithClient) };
			})
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