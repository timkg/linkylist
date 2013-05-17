(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');
	var LinkModel = require('./Link').compileModel();
	var Q = require('q');
	var tweetService = require('../services/twitter');
	var twitter_helper = require('../utils/twitterhelper');

	exports.compileModel = function () {

		if (mongoose.models.TweetModel) { return mongoose.models.TweetModel; }

		var tweetFormat = {
			created_at: Date,
			from_user: { type: String, required: true },
			from_user_id: Number,
			from_user_id_str: String,
			from_user_name: { type: String, required: true },
			id: { type: Number},
			id_str: { type: String, unique: true},
			profile_image_url: { type: String, required: true },
			profile_image_url_https: String,
			source: String,
			text: { type: String, required: true },
			entities: mongoose.Schema.Types.Mixed
		};

		var TweetSchema = mongoose.Schema(tweetFormat);
		var TweetModel = mongoose.model('Tweet', TweetSchema);

		TweetModel.promiseToSaveDocument = function(json) {
			if (typeof json === 'string') { json = JSON.parse(json); }

			var deferred = Q.defer();

			// make sure there is an independent LinkModel for the tweeted url before saving tweet
			// -----------------------------------------------------------------------------------
			LinkModel.findOrCreate({ url: json.entities.urls[0].expanded_url}, function(err, link) {
				if (err) { console.log(err); }

				TweetModel.create(json, function(err, tweet) {
					if (err) {
						deferred.reject(err);
						return false;
					}
					if (!link._tweets) { link._tweets = []; }
					// save reference to tweet in LinkModel
					// ------------------------------------
					if (link._tweets.indexOf(tweet._id) === -1 ) { link._tweets.push(tweet._id); }
					link.save(function(err) {
						if (err) { console.log(err); }
						// TweetModel was created, LinkModel created and/or updated to include Tweet - resolve promise
						// -------------------------------------------------------------------------------------------
						deferred.resolve(tweet);
					})
				});
			});

			return deferred.promise;
		};

		TweetModel.saveDocuments = function(json, callback) {
			if (typeof json === 'string') { json = JSON.parse(json); }
			// guarantee that we have the results, and not the whole api response
			// ------------------------------------------------------------------
			if (json.results && json.completed_in) { json = json.results; }

			// determine which tweeted urls already exist as LinkModel
			// -------------------------------------------------------
			var allUniqueLinksTweeted = twitter_helper.extractUniqueUrlsFromTweets(json);
			LinkModel
				.find({ url: { $in: allUniqueLinksTweeted } })
				.exec(function(err, links) {
					var allAlreadyExistingLinks = [];
					links.forEach(function(link) {
						allAlreadyExistingLinks.push(link.url);
					});
					// get links tweeted for which no LinkModel exists
					// -----------------------------------------------
					var newLinks = [];
					allUniqueLinksTweeted.forEach(function(link) {
						if (allAlreadyExistingLinks.indexOf(link) === -1) {
							newLinks.push({url: link});
						}
					});
					// create new LinkModels for all new urls
					// --------------------------------------
					LinkModel.create(newLinks, function(err) {
						if (err) { throw err; }

						// proceed with TweetModel creation
						// --------------------------------
						if (!Array.isArray(json)) { json = [json]; }

						var allOperationsAsPromises = [];
						json.forEach(function(tweet) {
							if( tweet.entities.urls && tweet.entities.urls[0] ) {
								var savePromise = TweetModel.promiseToSaveDocument(tweet).fail(function(reason) {
									console.warn(reason);
								});

								allOperationsAsPromises.push(savePromise);
							}
						});

						// call callback once all promises are resolved
						// --------------------------------------------
						Q.allResolved(allOperationsAsPromises)
							.then(function() {
								callback();
							})
							.fail(function(err) {
								console.log(err);
							});

					})
				})
		};

		TweetModel.searchApiForTweetsAbout = function(searchTerm, callback) {
			tweetService.searchTweetsWithUrlsAbout(searchTerm, function(twitterApiResponse) {
				TweetModel.saveDocuments(twitterApiResponse, function() {
					callback(twitterApiResponse);
				});
			});
		};

		return mongoose.models.TweetModel = TweetModel;
	};

} ());