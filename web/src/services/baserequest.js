(function() {
	/**/
	"use strict";

	var http = require('http');
	var https = require('https');

	exports.httpget = function(url, callback) {
		var request = http.get(url);
		request.on('response', function(response) {
			console.log('response received from ', url);
			var responseData = '';

			response.setEncoding('utf8');
			console.log('returned statusCode ' + response.statusCode);

			response.on('data', function(chunk) {
				responseData += chunk;
			});

			response.on('end', function() {

				if( response.statusCode !== 200 ) {
					console.log(responseData);
				}

				callback(responseData);
			});
		});
	};

	exports.httpsget = function(url, callback) {
		var request = https.get(url);
		request.on('response', function(response) {
			console.log('response received from ', url);
			var responseData = '';

			response.setEncoding('utf8');
			console.log('returned statusCode ' + response.statusCode);

			response.on('data', function(chunk) {
				responseData += chunk;
			});

			response.on('end', function() {

				if( response.statusCode !== 200 ) {
					console.log(responseData);
				}

				callback(responseData);
			});
		});
	};

} ());