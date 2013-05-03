(function() {
	/**/
	"use strict";

	var path = require('path');

	var twitter = require('../services/twitter');
	var embedly = require('../services/embedly');
	var tweetStreamHandler = require('../tweetStreamHandler');

	exports.start = function(app) {

		app.get('/links/:next_page', function(request, response) {
			// next_page includes searchterm, we can omit the first argument
			twitter.searchTweetsWithUrlsAbout('', function(tweets) {
				twitter.searchTweetsWithUrlsAbout(searchterm, function(tweets) {
					tweetStreamHandler.onResponse(tweets, function(httpResponse) {
						response.json(httpResponse);
					});
				});
			}, decodeURIComponent(request.params.next_page))
		});

		app.get('/links', function(request, response) {
			var searchterm = (request.query && request.query.search ? request.query.search : 'javascript');
			twitter.searchTweetsWithUrlsAbout(searchterm, function(tweets) {
				tweetStreamHandler.onResponse(tweets, function(payload) {
					response.json(payload);
					if (payload.resultsWithoutPreview && payload.resultsWithoutPreview.length > 0) {
						embedly.getOembedForListOfUrls(payload.resultsWithoutPreview, function(missingLinks) {
							embedly.saveEmbedData(missingLinks, function() {
								console.log(missingLinks);
							});
	//						socketio.streamLinksToClients(missingLinks, payload.socketUUID);
						});
					}
				});
			});
		});

		// TODO - static file server for /public
		app.get('/public/js/main.js', function(request, response) {
			response.sendfile( getHomePath() + '/public/js/main-dev.js');
		});

		// TODO - static file server for /public
		app.get('/public/*', function(request, response) {
			response.sendfile( getHomePath() + request.originalUrl);
		});

		app.get('/', function(request, response) {
			response.sendfile( getHomePath() + '/public/html/index-dev.html');
		});

	};

	function getHomePath() {
		return path.join( __dirname + '../../..' );
	}

} ());