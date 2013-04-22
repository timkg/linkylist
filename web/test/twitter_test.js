(function() {
	/**/
	"use strict";

	var twitter = require('../src/twitter');
	var sampleResponse;

	exports.test_performsFirstSearchForGivenQuery = function(test) {
		twitter.searchFor('javascript', function(responseData) {
			var data = JSON.parse(responseData);
			test.equals(data.page, 1, 'first search returns page 1');
			test.done();
		})
	};

	exports.test_automaticallyContinuesSearchFromPreviousPage = function(test) {
		twitter.searchFor('javascript', function(responseData) {
			sampleResponse = responseData; // save for following test to avoid unnecessary 3rd request to twitter
			var data = JSON.parse(responseData);
			test.equals(data.page, 2, 'second search returns page 2');
			test.done();
		})
	};

	exports.test_extractsArrayOfUrlsFromApiResponse = function(test) {
		var urls = twitter.getListOfUrlsFromApiResponse(sampleResponse);
		test.ok(Array.isArray(urls), 'gets list of urls');
		test.done();
	};

}());