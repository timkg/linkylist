(function() {
	/**/
	"use strict";

	var qs = require('querystring');

	// API version == 1.0
	var TWITTER_SEARCH_BASE_URL = 'http://search.twitter.com/search.json?';
	var TWITTER_SEARCH_PARAMS = '%20filter:links&include_entities=1';

	exports.extractUrlsFromTweets = function(tweets) {
		if( typeof tweets === 'string' ) { tweets = JSON.parse(tweets); }
		var urls = [];
		var tweetsWithUrls = [];
		for( var i = 0, len = tweets.length; i < len; i++ ) {
			console.log(tweets[i].entities);
			if( tweets[i].entities && tweets[i].entities.urls ) {
				tweetsWithUrls.push(tweets[i]);
				var arrayOfUrlsInTweet = tweets[i].entities.urls;
				for( var j = 0, urlsLen = arrayOfUrlsInTweet.length; j < urlsLen; j++ ) {
					urls.push(arrayOfUrlsInTweet[j].url);
				}
			}
		}

		var uniqueUrls = [];
		urls.map(function(url) {
			if (uniqueUrls.indexOf(url) === -1) {
				uniqueUrls.push(url);
			}
		});

		return uniqueUrls;
	};

	exports.buildSearchUrlFromQuery = function(query) {
		// format for first search: q=SEARCHTERM&filter:links&include_entities=1
		// format for successive pages: page=PAGE&max_id=MAXID&q=SEARCHTERM&filter:links&include_entities=1
		if (typeof query === 'string') { query = qs.parse(query); }

		return TWITTER_SEARCH_BASE_URL
				+ 'q=' + query.q + TWITTER_SEARCH_PARAMS
				+ (query.page ? '&page=' + query.page : '' )
				+ (query.max_id ? '&max_id=' + query.max_id : '' );
	};

} ());