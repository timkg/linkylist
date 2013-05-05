(function() {
	/**/
	"use strict";

	var fs = require('fs');
	var twitterhelper = require('../../src/utils/twitterhelper');

	exports.test_extractUrlsFromTweets = function(test) {
		fs.readFile('./web/test/testdata/exampleTwitterSearchResponse.json', 'utf8', function(err, data) {
			if (err) { throw err; }
			var data = JSON.parse(data);
			var tweets = data.results;

			var urls = twitterhelper.extractUrlsFromTweets(tweets);
			test.ok(Array.isArray(urls), 'returns Array');
			test.equals(urls[0], 'http://www.codecademy.com', 'found url in first tweet');
			test.done();
		})
	};

} ());