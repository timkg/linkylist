(function() {
	/**/
	"use strict";

	var embedly = require('../src/services/embedly');
	var testUrls = ['http://embed.ly/docs/embed/api', 'http://modernizr.com/docs/'];

	exports.test_getsExtractForListOfUrls = function(test) {

		embedly.getOembedForListOfUrls(testUrls, function(responseData) {
			var data = JSON.parse(responseData);
			test.ok(Array.isArray(data), 'embedly returns array with data');
			test.ok(data[0].url, 'first child has an URL property');
			test.done();
		});
	};
}());