(function() {
	/**/
	"use strict";

	var baserequest = require('./baserequest');

	var API_TOKEN = process.env.READABILITY_TOKEN;
	var READABILITY_BASE_URL = 'https://www.readability.com/api/content/v1/parser?url=';

	exports.get = function(urlToRead, callback, test_token) {
		var token = API_TOKEN || test_token;
		var url = READABILITY_BASE_URL + urlToRead + '&token=' + token;

		baserequest.httpsget(url, callback);
	};

}());