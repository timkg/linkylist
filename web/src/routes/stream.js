(function() {
	/**/
	"use strict";

	var LinkModel = require('../models/Link').compileModel();
	var EmbedlyExtractModel = require('../models/EmbedlyExtract').compileModel();
	var TwitterModel = require('../models/Tweet').compileModel();
	var twitterhelper = require('../utils/twitterhelper');

	var uuid = require('node-uuid');

	exports.start = function(app) {
		app.get('/links', function(request, response) {
			TwitterModel.searchApiForTweetsAbout(request.query, function(twitterApiResponse) {
				var urls = twitterhelper.extractUrlsFromTweets(twitterApiResponse.results);
				LinkModel
					.find({ url: { $in: urls } })
					.populate('_embedlyExtract')
					.populate('_tweets')
					.exec(function(err, links) {
						if (err) { throw err; }
						var data = {
							'connection': uuid.v1(),
							'links': links
						};
						response.json(data);
						exports.streamMissingEmbeds(data);
					});
			});
		});
	};

	exports.streamMissingEmbeds = function(data) {
		var linksWithoutEmbed = [];
		var linksWithEmbed = [];
		data.links.map(function(link) {
			if (!link._embedlyExtract) {
				linksWithoutEmbed.push(link.url);
			} else {
				linksWithEmbed.push(link.url); // just used for testing
			}
		});
		EmbedlyExtractModel.getExtractForUrls(linksWithoutEmbed, function(embeds) {
			console.log(embeds);
		});

		// todo  - socketio etc
	};


} ());