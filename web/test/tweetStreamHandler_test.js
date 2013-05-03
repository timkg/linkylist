(function() {
	/**/
	"use strict";

	var db = require('../src/db');

	var LinkModel = require('../src/models/Link').compileModel();
	var EmbedlyModel = require('../src/models/Embedly').compileModel();
	var tweetStreamHandler = require('../src/tweetStreamHandler');

	exports.start = function(test) {

		db.connect(function() {
			EmbedlyModel.create({
				"provider_url": 'http://twitter.com',
				"description": 'Twitter\'s awesome api is awesome!',
				"title": 'Twitter\'s awesome api',
				'url': 'http://twitter.com/api'
			}, function(err, embed) {
				if (err) { throw err; }
				LinkModel.create({
					url: embed.url,
					_embedly: embed._id
				}, function(err, link) {
					if (err) { throw err; }
					test.equals(link._embedly, embed._id, 'link with relation to embed created');
					test.done();
				});
			});
		});
	};

	exports.test_onResponse = function(test) {

		tweetStreamHandler.onResponse(['http://twitter.com/api', 'http://twitter.com'], function(payload) {
			console.log(payload);
			test.done();
		});
	};

	exports.test_extractUrlsNotInDbFromListOfUrls = function(test) {
		var results = [{
			url: 'http://twitter.com',
			title: 'blah'
		}];
		var expected = ['http://google.com/search', 'http://twitter.net', 'http://twitter.com', 'http://google.com'];
		var result = tweetStreamHandler.extractUrlsNotInDbFromListOfUrls(results, expected);
		test.equals(result.length, 3, 'finds links missing from DB');
		test.done();
	};

	exports.end = function(test) {
		LinkModel.remove({}, function(err) {
			if( err ) { throw err; }
			EmbedlyModel.remove({}, function(err) {
				if( err ) { throw err; }
				db.disconnect(test.done);
			});
		});
	};
} ());