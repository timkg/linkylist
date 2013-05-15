(function() {
	/*global escape*/
	"use strict";

	var baserequest = require('./baserequest');

	var API_KEY = process.env.EMBEDLY;
	var EXTRACT_BASE_URL = 'http://api.embed.ly/1/extract?key=';
	var OEMBED_BASE_URL = 'http://api.embed.ly/1/oembed?key=';

	exports.getExtractForUrls = function(listOfUrls, callback, test_api_key) {
		if (!Array.isArray(listOfUrls) || !(listOfUrls.length > 0 )) { return false; }
		var api_key = API_KEY || test_api_key;
		var url = EXTRACT_BASE_URL + api_key + '&urls=' + listOfUrlsIntoQueryParameter(listOfUrls);

		baserequest.httpget(url, function(response) {
			if (typeof response === 'string') { response = JSON.parse(response); }
			callback(response);
		});
	};

	exports.getOembedForUrls = function(listOfUrls, callback, test_api_key) {
		if (!Array.isArray(listOfUrls) || !(listOfUrls.length > 0 )) { return false; }
		var api_key = API_KEY || test_api_key;
		var url = OEMBED_BASE_URL + api_key + '&urls=' + listOfUrlsIntoQueryParameter(listOfUrls);

		baserequest.httpget(url, function(response) {
			if (typeof response === 'string') { response = JSON.parse(response); }
			callback(response);
		});
	};

	function listOfUrlsIntoQueryParameter(listOfUrls) {
		var param = '';
		for( var i = 0, len = (listOfUrls.length > 20 ? 20 : listOfUrls.length); i < len; i++ ) {
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