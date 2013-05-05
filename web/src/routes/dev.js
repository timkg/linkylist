(function() {
	/**/
	"use strict";

	var path = require('path');

	exports.start = function(app) {

//		app.get('/links/:next_page', function(request, response) {
//			// next_page includes searchterm, we can omit the first argument
//			twitter.searchTweetsWithUrlsAbout('', function(tweets) {
//					tweetStreamHandler.onResponse(tweets, function(httpResponse) {
//						response.json(httpResponse);
//					});
//			}, decodeURIComponent(request.params.next_page))
//		});


		require('./stream').start(app);

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