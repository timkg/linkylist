(function() {

	"use strict";

	var http = require('http');

	var TWITTER_SEARCH_BASE_URL = 'http://search.twitter.com/search.json';
	var TWITTER_SEARCH_PARAMS = '&filter:links&include_entities=1';

	var searches = {};

	exports.searchTweetsWithUrlsAbout = function(searchTerm, callback, next_page) {
		var url = TWITTER_SEARCH_BASE_URL;
		if( !next_page ) {
			url += '?q=' + searchTerm + TWITTER_SEARCH_PARAMS;
		} else {
			url += next_page;
		}
		var request = http.get(url);
		request.on('response', function(response) {
			console.log('response received from ', url);
			var responseData = '';

			response.setEncoding('utf8');
			console.log('twitter returned statusCode ' + response.statusCode);

			response.on('data', function(chunk) {
				responseData += chunk;
			});

			response.on('end', function() {

				if( response.statusCode !== 200 ) {
					console.log(responseData);
				}

				var data = JSON.parse(responseData);
				callback({
					next_page: data.next_page,
					items: data.results
				});
			});
		});
	};


	exports.extractUrlsFromTweets = function(data) {
		if( typeof data === 'string' ) { data = JSON.parse(data); }
		var urls = [];
		var tweetsWithUrls = [];
		for( var i = 0, len = data.length; i < len; i++ ) {
			if( data[i].entities && data[i].entities.urls ) {
				tweetsWithUrls.push(data[i]);
				var arrayOfUrlsInTweet = data[i].entities.urls;
				for( var j = 0, urlsLen = arrayOfUrlsInTweet.length; j < urlsLen; j++ ) {
					urls.push(arrayOfUrlsInTweet[j].expanded_url);
				}
			}
		}

		return urls;
	};
}());