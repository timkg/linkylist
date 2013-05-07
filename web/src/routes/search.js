(function() {
	/**/
	"use strict";

	var LinkModel = require('../models/Link').compileModel();
	var TwitterModel = require('../models/Tweet').compileModel();
	var twitterhelper = require('../utils/twitterhelper');
	var socketio = require('../socketio');

	var uuid = require('node-uuid');

	exports.start = function(app) {
		app.get('/search', function(request, response) {
			TwitterModel.searchApiForTweetsAbout(request.query, function(twitterApiResponse) {
				var urls = twitterhelper.extractUrlsFromTweets(twitterApiResponse.results);
				LinkModel
					.find({ url: { $in: urls } })
					.populate('_tweets')
					.populate('_embedlyExtract')
					.exec(function(err, links) {
						if (err) { throw err; }
						// TODO - remove duplication with stream.js
						var data = {
							'connection': uuid.v1(),
							'payload': links
						};
						response.json(data);
						socketio.sendMissingPreviews(data, response);
					});
			});
		});
	};


} ());