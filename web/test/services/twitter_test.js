(function() {
	/**/
	"use strict";

	var twitter = require('../../src/services/twitter');
	var next_page;

	exports.test_performsFirstSearchForGivenQuery = function(test) {
		twitter.searchTweetsWithUrlsAbout('javascript', function(responseData) {
			if (typeof responseData === 'string') { responseData = JSON.parse(responseData); }
			next_page = responseData.next_page;
			test.equals(responseData.page, 1, 'first search returns page 1');
			test.done();
		});
	};

	exports.test_continuesFromSecondPageWhenGivenParameter = function(test) {
		twitter.searchTweetsWithUrlsAbout('javascript', function(responseData) {
			if (typeof responseData === 'string') { responseData = JSON.parse(responseData); }
			test.equals(responseData.page, 2, 'returns page 2 when asked for it');
			test.done();
		}, next_page);
	};

}());