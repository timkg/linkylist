(function() {
	/**/
	"use strict";

	var LinkModel = require('../models/Link').compileModel();
	var TwitterModel = require('../models/Tweet').compileModel();
	var twitterhelper = require('../utils/twitterhelper');
	var socketio = require('../socketio');
	var EmbedlyExtractModel = require('../models/EmbedlyExtract').compileModel();

	var uuid = require('node-uuid');

	exports.start = function(app) {
		app.get('/search', function(request, response) {
			TwitterModel.searchApiForTweetsAbout(request.query, function(twitterApiResponse) {
				var urls = twitterhelper.extractUniqueUrlsFromTweets(twitterApiResponse.results);
				LinkModel
					.find({ url: { $in: urls } })
					.populate('_tweets')
					.populate('_embedlyExtract')
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
//						response.json(data);

						// check which links were sent without preview
						// -------------------------------------------
						var linksWithoutEmbed = [];
						data.payload.map(function(link) {
							if (!link._embedlyExtract) {
								linksWithoutEmbed.push(link.url);
							}
						});

						// get missing previews and stream them to client via socket.io
						// ------------------------------------------------------------
						if (linksWithoutEmbed.length > 0) {
							EmbedlyExtractModel.getExtractForUrls(linksWithoutEmbed, function(embeds) {
								socketio.sendToConnection({
									connection: data.connection
									, payload: embeds
								});
							});
						}
					});
			});
		});
	};


} ());