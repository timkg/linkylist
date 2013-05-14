(function() {
	/**/
	"use strict";

	var qs = require('querystring');

	// API version == 1.0
	var TWITTER_SEARCH_BASE_URL = 'http://search.twitter.com/search.json?';
	var TWITTER_DEFAULT_SEARCH_PARAMS = '&include_entities=1';

	exports.extractUrlsFromTweets = function(tweets) {
		if( typeof tweets === 'string' ) { tweets = JSON.parse(tweets); }
		var urls = [];
		var tweetsWithUrls = [];
		for( var i = 0, len = tweets.length; i < len; i++ ) {
			if( tweets[i].entities && tweets[i].entities.urls ) {
				tweetsWithUrls.push(tweets[i]);
				var arrayOfUrlsInTweet = tweets[i].entities.urls;
				for( var j = 0, urlsLen = arrayOfUrlsInTweet.length; j < urlsLen; j++ ) {
					var expanded_url = (arrayOfUrlsInTweet[j].expanded_url ? arrayOfUrlsInTweet[j].expanded_url : arrayOfUrlsInTweet[j].url);
					urls.push(expanded_url);
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
		if (query[0] === '?') { query = query.substr(1); }
		// format for first search: q=SEARCHTERM%20filter:links&include_entities=1
		// format for successive pages: page=PAGE&max_id=MAXID&q=SEARCHTERM%20filter:links&include_entities=1
		if (typeof query === 'string') { query = qs.parse(query); }

		// set default search to "javascript" when no "q" param given
		if (!query.q) { query.q = 'javascript'; }

		// tell twitter to only return tweets with links, if corresponding filter is not yet included in query
		if (query.q.indexOf('filter:links') === -1) { query.q += " filter:links" }

		return TWITTER_SEARCH_BASE_URL
				+ 'q=' + query.q
				+ (query.page ? '&page=' + query.page : '' )
				+ (query.max_id ? '&max_id=' + query.max_id : '' )
				+ TWITTER_DEFAULT_SEARCH_PARAMS;
	};

} ());