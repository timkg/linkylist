(function() {
	/**/
	"use strict";

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

		var uniqueUrls = [];
		urls.map(function(url) {
			if (uniqueUrls.indexOf(url) === -1) {
				uniqueUrls.push(url);
			}
		});

		return uniqueUrls;
	};

} ());