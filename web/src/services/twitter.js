(function() {
	/**/
	"use strict";

	var baserequest = require('./baserequest');
	var twitterhelper = require('../utils/twitterhelper');

	exports.searchTweetsWithUrlsAbout = function(query, callback, next_page) {
		var url = twitterhelper.buildSearchUrlFromQuery(query);
		baserequest.httpget(url, function(response) {
			if (typeof response === 'string') { response = JSON.parse(response); }
			callback(response);
		});
	};

}());