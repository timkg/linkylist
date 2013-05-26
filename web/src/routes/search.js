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
				var urls = twitterhelper.extractUniqueUrlsFromTweets(twitterApiResponse.results);
				LinkModel
					.find({ url: { $in: urls } })
					.populate('_tweets')
					.exec(function(err, links) {
						if (err) { throw err; }

						// prepare response object
						// -----------------------
						var data = {
							'connection': uuid.v1()
							, 'next_page': '/search' + twitterApiResponse.next_page
							, 'payload': links
						};

						// send response
						// -------------
						response.render('search', {data: data});

					});
			});
		});
	};


} ());