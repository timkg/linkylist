(function() {
	/**/
	"use strict";

	var https = require('https');
	var TOKEN = process.env.READABILITY_TOKEN;
	var READABILITY_BASE_URL = 'https://www.readability.com/api/content/v1/parser?url=';

	exports.get = function(url, callback, token) {
		token = TOKEN || token;
		if( !token ) { throw 'Could not find readability token'; }

		var url = READABILITY_BASE_URL + url + '&token=' + token;

		var request = https.get(url);
		request.on('response', function(response) {
			console.log('response received from ', url);
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