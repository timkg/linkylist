(function() {
	/*global escape*/
	"use strict";

	var baserequest = require('./baserequest');

	var API_KEY = process.env.EMBEDLY;
	var BASE_URL = 'http://api.embed.ly/1/oembed?key=';

	exports.getOembedForListOfUrls = function(listOfUrls, callback, test_api_key) {
		var api_key = API_KEY || test_api_key;
		var url = BASE_URL + api_key + '&urls=' + listOfUrlsIntoQueryParameter(listOfUrls);

		baserequest.httpget(url, callback);
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