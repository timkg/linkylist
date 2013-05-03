(function() {
	/*global escape*/
	"use strict";

	var http = require('http');

	var Q = require('q');

	var API_KEY = process.env.EMBEDLY;
	var BASE_URL = 'http://api.embed.ly/1/oembed?key=';

	var EmbedlyModel = require('../../src/models/embedly').compileModel();
	var LinkModel = require('../../src/models/link').compileModel();

	exports.getOembedForListOfUrls = function(listOfUrls, callback, test_api_key) {
		var api_key = API_KEY || test_api_key;
		var url = BASE_URL + api_key + '&urls=' + listOfUrlsIntoQueryParameter(listOfUrls);

		var request = http.get(url);
		request.on('response', function(response) {
			console.log('response received from ', url);
			var responseData = '';

			response.setEncoding('utf8');
			console.log('embedly returned statusCode ' + response.statusCode);

			response.on('data', function(chunk) {
				responseData += chunk;
			});

			response.on('end', function() {
//				if( response.statusCode === 401 ) {
//					// TODO
//				}
				callback(responseData);
			});
		});
	};

	exports.saveEmbedData = function(json, callback) {
		if (typeof json === 'string') { json = JSON.parse(json); }
		if (!Array.isArray(json)) { json = [json]; }

		var allOperationsAsPromises = [];
		json.forEach(function(embedValue) {
			allOperationsAsPromises.push(EmbedlyModel.promiseToSave(embedValue));
		});

		Q.allResolved(allOperationsAsPromises).then(function() {
			callback();
		});
	};

	function listOfUrlsIntoQueryParameter(listOfUrls) {
		var param = '';
		for( var i = 0, len = listOfUrls.length; i < len; i++ ) {
			if (typeof listOfUrls[i] === 'object' && listOfUrls[i].url) {
				param += escape(listOfUrls[i].url);
			} else {
				param += escape(listOfUrls[i]);
			}
			if( i < len-1 ) {
				param += ',';
			}
		}

		return param;
	}

}());