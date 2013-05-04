(function() {
	/**/
	"use strict";

	var helper = require('./helper');
	var readability = require('../../src/services/readability');
	var testUrl = 'http://www.spiegel.de';

	var API_TOKEN;

	exports.start = function(test) {
		// read api token from .env file
		helper.readTokenFromFile('READABILITY_TOKEN', function(TOKEN) {
			API_TOKEN = TOKEN;
			test.done();
		});
	};

	exports.test_getsResponseForSingleUrl = function(test) {

		readability.get(testUrl, function(response) {
			if (typeof response === 'string') { response = JSON.parse(response); }
			test.ok(response, 'returned something');
			test.equals(typeof response.domain, 'string', 'returns an object with properties');
			test.done();
		}, API_TOKEN);
	};

}());