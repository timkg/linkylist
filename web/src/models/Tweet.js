(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');
	var LinkModel = require('./Link').compileModel();
	var Q = require('q');

	exports.compileModel = function () {

		if (mongoose.models.TweetModel) { return mongoose.models.TweetModel; }

		var tweetFormat = {
			created_at: Date,
			from_user: { type: String, required: true },
			from_user_id: Number,
			from_user_id_str: String,
			from_user_name: { type: String, required: true },
			id: Number,
			id_str: String,
			profile_image_url: { type: String, required: true },
			profile_image_url_https: String,
			source: String,
			text: { type: String, required: true },
			entities: mongoose.Schema.Types.Mixed
		};

		var TweetModel = mongoose.model('Tweet', mongoose.Schema(tweetFormat));

		TweetModel.promiseToSaveDocument = function(json) {
			if (typeof json === 'string') { json = JSON.parse(json); }

			var deferred = Q.defer();

			TweetModel.create(json, function(err, tweet) {
				if (err) {
					console.log(err);
					deferred.reject(new Error(err));
				}
				LinkModel.findOrCreate({ url: tweet.entities.urls[0].expanded_url}, function(err, link) {
					if (err) {
						console.log(err);
						deferred.reject(new Error(err));
					}
					link._tweets.push(tweet._id);
					link.save(function(err) {
						if (err) { deferred.reject(new Error(err)); }
						deferred.resolve(tweet);
					})
				});
			});

			return deferred.promise;
		};

		TweetModel.saveDocuments = function(json, callback) {
			if (typeof json === 'string') { json = JSON.parse(json); }
			// guarantee that we have the results, and not the whole api response
			if (json.results && json.completed_in) { json = json.results; }
			if (!Array.isArray(json)) { json = [json]; }

			var allOperationsAsPromises = [];
			json.forEach(function(tweet) {
				allOperationsAsPromises.push(TweetModel.promiseToSaveDocument(tweet));
			});

			Q.allResolved(allOperationsAsPromises)
				.then(function() {
					callback();
				})
				.fail(function(err) {
					console.log(err);
				});
		};

		TweetModel.extractUrlsFromTweets = function(data) {
			if( typeof data === 'string' ) { data = JSON.parse(data); }
			var urls = [];
			var tweetsWithUrls = [];
			for( var i = 0, len = data.length; i < len; i++ ) {
				if( data[i].entities && data[i].entities.urls ) {
					tweetsWithUrls.push(data[i]);
					var arrayOfUrlsInTweet = data[i].entities.urls;
					for( var j = 0, urlsLen = arrayOfUrlsInTweet.length; j < urlsLen; j++ ) {
						urls.push(arrayOfUrlsInTweet[j].expanded_url);
					}
				}
			}

			var uniqueUrls = [];
			urls.map(function(url) {
				if (uniqueUrls.indexOf(url) === -1) {
					uniqueUrls.push(url);
				}
			});

			return uniqueUrls;
		};

		return mongoose.models.TweetModel = TweetModel;
	};

} ());