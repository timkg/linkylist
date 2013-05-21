(function() {
	/**/
	"use strict";

	var qs = require('querystring');
	var array_helper = require('./arrayhelper');

	// API version == 1.0
	var TWITTER_SEARCH_BASE_URL = 'http://search.twitter.com/search.json?';
	var TWITTER_DEFAULT_SEARCH_PARAMS = '&include_entities=1';

	exports.extractUniqueUrlsFromTweets = function(tweets) {
		if( typeof tweets === 'string' ) { tweets = JSON.parse(tweets); }
		var urls = [];
		var tweetsWithUrls = [];
		for( var i = 0, len = tweets.length; i < len; i++ ) {
			if( tweets[i].entities && tweets[i].entities.urls ) {
				urls.push(tweets[i].entities.urls[0].expanded_url);
			}
		}

		return array_helper.unique(urls);
	};

	exports.buildSearchUrlFromQuery = function(query) {
		if (query[0] === '?') { query = query.substr(1); }
		// format for first search: q=SEARCHTERM%20filter:links&include_entities=1
		// format for successive pages: page=PAGE&max_id=MAXID&q=SEARCHTERM%20filter:links&include_entities=1
		if (typeof query === 'string') { query = qs.parse(query); }

		// set default search to "javascript" when no "q" param given
		if (!query.q) { query.q = 'javascript'; }

		// tell twitter to only return tweets with links, if corresponding filter is not yet included in query
		if (query.q.indexOf('filter:links') === -1) { query.q += " filter:links"; }

		return TWITTER_SEARCH_BASE_URL
				+ 'q=' + query.q
				+ (query.page ? '&page=' + query.page : '' )
				+ (query.max_id ? '&max_id=' + query.max_id : '' )
				+ TWITTER_DEFAULT_SEARCH_PARAMS;
	};

} ());