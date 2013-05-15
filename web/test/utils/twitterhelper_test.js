(function() {
	/**/
	"use strict";

	var fs = require('fs');
	var twitterhelper = require('../../src/utils/twitterhelper');

	exports.test_extractUrlsFromTweets = function(test) {
		fs.readFile('./web/test/testdata/twitterSearchResponse.json', 'utf8', function(err, data) {
			if (err) { throw err; }
			var data = JSON.parse(data);
			var tweets = data.results;

			var urls = twitterhelper.extractUniqueUrlsFromTweets(tweets);
			test.ok(Array.isArray(urls), 'returns Array');
			test.equals(urls[0], 'http://www.codecademy.com', 'found url in first tweet');
			test.done();
		})
	};

	exports.test_buildsSearchUrlFromKeyword = function(test) {
		var query = 'q=javascript';
		var url = twitterhelper.buildSearchUrlFromQuery(query);
		test.equals(url, 'http://search.twitter.com/search.json?q=javascript filter:links&include_entities=1', 'built correct url');
		test.done();
	};

	exports.test_buildsSearchUrlFromNextPage = function(test) {
		var query = 'page=2&max_id=331006804047822849&q=javascript';
		var url = twitterhelper.buildSearchUrlFromQuery(query);
		test.equals(url, 'http://search.twitter.com/search.json?q=javascript filter:links&page=2&max_id=331006804047822849&include_entities=1', 'built correct url');
		test.done();
	};

} ());