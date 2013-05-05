(function() {
	/**/
	"use strict";

	var LinkModel = require('../models/Link').compileModel();
	var EmbedlyModel = require('../models/Embedly').compileModel();
	var TwitterModel = require('../models/Tweet').compileModel();
	var twitterhelper = require('../utils/twitterhelper');

	var uuid = require('node-uuid');

	exports.start = function(app) {
		app.get('/links', function(request, response) {
			TwitterModel.searchApiForTweetsAbout(request.query, function(twitterApiResponse) {
				var urls = twitterhelper.extractUrlsFromTweets(twitterApiResponse.results);
				LinkModel
					.find({ url: { $in: urls } })
					.populate('_embedly')
					.populate('_tweets')
					.exec(function(err, links) {
						if (err) { throw err; }
						exports.send(response, links);
					});
			});
		});
	};

	exports.send = function(response, links) {
		response.json(links);
		// todo  - socketio etc
	};


} ());