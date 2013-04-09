var http = require('http');
var API_KEY = require('./api-keys').embedly.apiKey;

var BASE_URL = 'http://api.embed.ly/1/oembed?key=';

exports.getOembedForListOfUrls = function(listOfUrls, callback) {
	var url = BASE_URL + API_KEY + '&urls=' + listOfUrlsIntoQueryParameter(listOfUrls);

	var request = http.get(url);
	request.on('response', function(response) {
		var responseData = '';

		response.setEncoding('utf8');
		console.log('embedly returned statusCode ' + response.statusCode);

		response.on('data', function(chunk) {
			responseData += chunk;
		});

		response.on('end', function() {
			callback(responseData);
		});
	});
}

function listOfUrlsIntoQueryParameter(listOfUrls) {
	var param = '';
	for( var i = 0, len = listOfUrls.length; i < len; i++ ) {
		param += escape(listOfUrls[i]);
		if( i < len-1 ) {
			param += ',';
		}
	}

	return param;
}