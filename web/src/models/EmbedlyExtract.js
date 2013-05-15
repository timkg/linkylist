(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');
	var LinkModel = require('./Link').compileModel();
	var Q = require('q');
	var array_helper = require('../utils/arrayhelper');

	var embedlyservice = require('../services/embedly');

	exports.compileModel = function() {

		if (mongoose.models.EmbedlyExtractModel) { return mongoose.models.EmbedlyExtractModel; }

		var extractFormat = {
			original_url: { type: String, required: true, unique: true },
			url: {type: String},
			provider_name: String,
			provider_url: String,
			provider_display: String,
			favicon_url: String,
			title: String,
			description: String,
			authors: [mongoose.Schema.Types.Mixed],
			media: String,
			content: mongoose.Schema.Types.Mixed,
			keywords: mongoose.Schema.Types.Mixed,
			entities: mongoose.Schema.Types.Mixed,
			images: mongoose.Schema.Types.Mixed
		};

		var EmbedlyExtractModel = mongoose.model('EmbedlyExtract', mongoose.Schema(extractFormat));

		EmbedlyExtractModel.assignEmbedToLink = function(embed, callback) {
			LinkModel.findOrCreate({ url: embed.original_url}, function(err, link) {
				if (err) { deferred.reject(new Error(err)); return false; }
				if (!link._embedlyExtract) {
					link._embedlyExtract = embed._id;
					link.save(function(err) {
						if (err) { callback(new Error(err), null); }
						callback(null, embed);
					});
				} else { callback(null, embed); }
			});
		};

		EmbedlyExtractModel.promiseToSaveDocument = function(json) {
			if (typeof json === 'string') { json = JSON.parse(json); }

			var deferred = Q.defer();

			if (!json.original_url) { deferred.reject(new Error('url not existent or not readable')); }

			EmbedlyExtractModel
				.findOne({original_url: json.original_url})
				.exec(function(err, embed) {
					if (!embed) {
						EmbedlyExtractModel.create(json, function(err, embed) {
							if (err || !embed) { deferred.reject(new Error(err)); return false; }
							EmbedlyExtractModel.assignEmbedToLink(embed, function(err, embed) {
								if (err || !embed) { deferred.reject(new Error(err)); }
								deferred.resolve(embed);
							});
						});
					} else {
						EmbedlyExtractModel.assignEmbedToLink(embed, function(err, embed) {
							if (err || !embed) { deferred.reject(new Error(err)); }
							deferred.resolve(embed);
						});
					}
				});

			return deferred.promise;
		};

		EmbedlyExtractModel.saveDocuments = function(json, callback) {
			if (typeof json === 'string') { json = JSON.parse(json); }
			if (!Array.isArray(json)) { json = [json]; }

			var allOperationsAsPromises = [];
			json.forEach(function(embedValue) {
				var embedPromise = EmbedlyExtractModel.promiseToSaveDocument(embedValue).fail(function(error) {
					console.warn(error);
				});
				allOperationsAsPromises.push(embedPromise);
			});

			Q.allResolved(allOperationsAsPromises)
				.then(function(promises) {
					var embeds = [];
					promises.forEach(function(promise) {
						if (promise.isFulfilled()) {
							embeds.push(promise.valueOf());
						} else {
							var exception = promise.valueOf().exception;
						}
					});
					callback(embeds);
				})
				.fail(function(err) {
					console.log(err);
				});
		};

		EmbedlyExtractModel.getExtractForUrls = function(listOfUrls, callback) {
			if (!Array.isArray(listOfUrls) || !(listOfUrls.length > 0 )) {
				throw new TypeError("EmbedlyExtractModel.getExtractForUrls expects array as first argument");
			}
			listOfUrls = array_helper.unique(listOfUrls);
			embedlyservice.getExtractForUrls(listOfUrls, function(embedlyApiResponse) {
				EmbedlyExtractModel.saveDocuments(embedlyApiResponse, callback);
			});
		};

		return mongoose.models.EmbedlyExtractModel = EmbedlyExtractModel;
	};


} ());