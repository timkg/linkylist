(function() {
	/**/
	"use strict";

	var tweetStreamHandler = require('../src/tweetStreamHandler');

//	exports.start = function() {};

	exports.test_sendDbResults = function(test) {
		var results = [{
			url: 'http://twitter.com',
			title: 'blah'
		}];
		var expected = ['http://google.com/search', 'http://twitter.net', 'http://twitter.com', 'http://google.com'];
		tweetStreamHandler.sendDbResults(results, expected, function(response) {
			console.log(response);
			test.done();
		});
	};

//	exports.end= function() {};
} ());