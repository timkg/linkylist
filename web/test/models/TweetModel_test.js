(function () {
	/**/
	"use strict";

	var fs = require("fs");

	var TweetModel = require('../../src/models/Tweet').compileModel();
	var LinkModel = require('../../src/models/Link').compileModel();
	var db = require('../../src/db');

	exports.start = function(test) {
		db.connect(function() {
			TweetModel.remove({}, function(err) {
				if (err) { throw err; }
				LinkModel.remove({}, function(err) {
					if (err) { throw err; }
					test.done();
				})
			})
		});
	};

	exports.test_isCompiled = function(test) {
		test.ok(TweetModel, 'compiled it');
		test.done();
	};

	exports.test_savesInstances = function(test) {
		TweetModel.create({
			created_at: "Sat, 04 May 2013 18:35:47 +0000",
			entities: {
				urls: [
					{
						url: "http://t.co/Kl3dv1E5ZR",
						expanded_url: "http://bit.ly/15fNrWq",
						display_url: "bit.ly/15fNrWq",
						indices: [
							127,
							149
						]
					}
				],
			},
			from_user: "bungpunk",
			from_user_id: 315006999,
			from_user_id_str: "315006999",
			from_user_name: "bungpunk",
			id: 330752632794779650,
			id_str: "330752632794779648",
			profile_image_url: "http://a0.twimg.com/profile_images/1390842811/cthulu_normal.png",
			profile_image_url_https: "https://si0.twimg.com/profile_images/1390842811/cthulu_normal.png",
			source: "&lt;a href=&quot;http://twitterfeed.com&quot;&gt;twitterfeed&lt;/a&gt;",
			text: "PHP script using soundcloud &amp; mixcloud API (JSON) for a wordpress site by damienMTL: &gt;&gt;&gt; Write a PHP script to... http://t.co/Kl3dv1E5ZR"
		}, function(err, tweet) {
			if (err) { throw err; }
			test.equals(tweet.id, 330752632794779650, 'saved tweet data');
			test.ok(tweet._id, 'gave tweet an _id');
			test.done();
		});
	};

	exports.test_savesApiResponse = function(test) {

		fs.readFile('./web/test/testdata/exampleTwitterSearchResponse.json', 'utf8', function(err, data) {
			if (err) { throw err; }
			data = JSON.parse(data);
			TweetModel.saveTwitterApiResponse(data, function() {
				// one of the test tweets contains the url http://www.codecademy.com
				LinkModel
					.findOne({url: 'http://www.codecademy.com'})
					.populate('_tweets')
					.exec(function(err, link) {
						test.equals(link.url, 'http://www.codecademy.com', 'link was created for url of tweet');
						test.ok(link._tweets[0]._id, 'tweet was created and associated to link');
						test.done();
					});
			});

		})
	};

	exports.end = function(test) {
		db.disconnect(test.done);
	};

}());