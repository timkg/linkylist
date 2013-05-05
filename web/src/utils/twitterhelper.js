(function() {
	/**/
	"use strict";

	exports.extractUrlsFromTweets = function(tweets) {
		if( typeof tweets === 'string' ) { tweets = JSON.parse(tweets); }
		var urls = [];
		var tweetsWithUrls = [];
		for( var i = 0, len = tweets.length; i < len; i++ ) {
			if( tweets[i].entities && tweets[i].entities.urls ) {
				tweetsWithUrls.push(tweets[i]);
				var arrayOfUrlsInTweet = tweets[i].entities.urls;
				for( var j = 0, urlsLen = arrayOfUrlsInTweet.length; j < urlsLen; j++ ) {
					urls.push(arrayOfUrlsInTweet[j].expanded_url);
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

} ());