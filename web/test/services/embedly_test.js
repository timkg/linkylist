(function() {
	/**/
	"use strict";

	var helper = require('./helper');
	var embedly = require('../../src/services/embedly');
	var testUrls = ['http://embed.ly/docs/embed/api', 'http://modernizr.com/docs/'];

	var API_TOKEN;

	exports.start = function(test) {
		// read api token from .env file
		helper.readTokenFromFile('EMBEDLY', function(TOKEN) {
			API_TOKEN = TOKEN;
			test.done();
		});
	};

	// uncomment to actually request things from embed.ly API
	exports.test_getOembedForUrls = function(test) {

		embedly.getOembedForUrls(testUrls, function(response) {
			if (typeof response === 'string') { response = JSON.parse(response); }
			test.ok(Array.isArray(response), 'embedly returns array with data');
			test.ok(response[0].url, 'first child has an URL property');
			test.done();
		}, API_TOKEN);
	};

	// uncomment to actually request things from embed.ly API
	exports.test_getExtractForUrls = function(test) {
		embedly.getExtractForUrls(testUrls, function(response) {
			if (typeof response === 'string') { response = JSON.parse(response); }
			test.ok(Array.isArray(response), 'embedly returns array with data');
			test.ok(response[0].url, 'first child has an URL property');
			test.done();
		}, API_TOKEN);

	};

}());