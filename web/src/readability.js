(function() {
	/**/
	"use strict";

	var https = require('https');
	var TOKEN = process.env.READABILITY_TOKEN;
	var READABILITY_BASE_URL = 'https://www.readability.com/api/content/v1/parser?url=';

	exports.get = function(urlToRead, callback, token) {
		token = TOKEN || token;
		if( !token ) { throw 'Could not find readability token'; }

		var requestUrl = READABILITY_BASE_URL + urlToRead + '&token=' + token;

		var request = https.get(requestUrl);
		request.on('response', function(response) {
			console.log('response received from ', requestUrl);
			var responseData = '';

			response.setEncoding('utf8');
			console.log('readability returned statusCode ' + response.statusCode);

			response.on('data', function(chunk) {
				responseData += chunk;
			});

			response.on('end', function() {
				var data = JSON.parse(responseData);
				callback(data);
			});
		});

	};

}());