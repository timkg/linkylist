(function() {
	/**/
	"use strict";

	var fs = require('fs');
	var readability = require('../src/readability');
	var testUrl = 'http://www.spiegel.de';

	exports.test_getsResponseForSingleUrl = function(test) {
		fs.readFile('./.env', 'utf8', function(err, data) {
			if(err) { throw err; }
			var READABILITY_TOKEN = '';
			var lines = data.split('\n');
			lines.forEach(function(line) {
				var parts = line.split('=');
				if( parts[0] === 'READABILITY_TOKEN' ) {
					READABILITY_TOKEN = parts[1];
				}
			});
			readability.get(testUrl, function(response) {
				test.ok(response, 'returned something');
				test.equals(typeof response.domain, 'string', 'returns an object with properties');
				test.done();
			}, READABILITY_TOKEN);
		});
	};

}());