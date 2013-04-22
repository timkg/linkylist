(function() {
	/**/
	"use strict";

	var fs = require('fs');
	var embedly = require('../src/embedly');
	var testUrls = ['http://embed.ly/docs/embed/api', 'http://modernizr.com/docs/'];

	exports.test_getsExtractForListOfUrls = function(test) {
		fs.readFile('./.env', 'utf8', function(err, data) {
			if(err) { throw err };
			var EMBEDLY_KEY = '';
			var lines = data.split('\n');
			lines.forEach(function(line) {
				var parts = line.split('=');
				if( parts[0] === 'EMBEDLY' ) {
					EMBEDLY_KEY = parts[1];
				}
			});
			embedly.getOembedForListOfUrls(testUrls, function(responseData) {
				var data = JSON.parse(responseData);
				test.ok(Array.isArray(data), 'embedly returns array with data');
				test.ok(data[0].url, 'first child has an URL property');
				test.done();
			}, EMBEDLY_KEY);
		})
	};
}());