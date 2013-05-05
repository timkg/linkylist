(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');
	var LinkModel = require('./Link').compileModel();
	var Q = require('q');

	var embedlyservice = require('../services/embedly');

	exports.compileModel = function () {

		if (mongoose.models.EmbedlyOembedModel) { return mongoose.models.EmbedlyOembedModel; }

		var oembedFormat = {
			"provider_url": String,
			"description": String,
			"title": String,
			"url": { type: String, required: true },
			"thumbnail_width": Number,
			"thumbnail_url": String,
			"version": String,
			"provider_name": String,
			"type": String,
			"thumbnail_height": Number
		};

		var EmbedlyOembedModel = mongoose.model('EmbedlyOembed', mongoose.Schema(oembedFormat));

		EmbedlyOembedModel.promiseToSaveDocument = function(json) {
			if (typeof json === 'string') { json = JSON.parse(json); }

			var deferred = Q.defer();

			if (!json.url) { deferred.reject(new Error('url not existent or not readable')); }

			EmbedlyOembedModel.create(json, function(err, embed) {
				if (err) {
					console.log(err);
					deferred.reject(new Error(err));
				}
				LinkModel.findOrCreate({ url: embed.url}, function(err, link) {
					if (err) {
						console.log(err);
						deferred.reject(new Error(err));
					}
					link._embedlyOembed = embed._id;
					link.save(function(err) {
						if (err) { deferred.reject(new Error(err)); }
						deferred.resolve(embed);
					})
				});
			});

			return deferred.promise;
		};

		EmbedlyOembedModel.saveDocuments = function(json, callback) {
			if (typeof json === 'string') { json = JSON.parse(json); }
			if (!Array.isArray(json)) { json = [json]; }

			var allOperationsAsPromises = [];
			json.forEach(function(embedValue) {
				allOperationsAsPromises.push(EmbedlyOembedModel.promiseToSaveDocument(embedValue));
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

		EmbedlyOembedModel.getOembedForUrls = function(listOfUrls, callback) {
			embedlyservice.getOembedForUrls(listOfUrls, function(embedlyApiResponse) {
				EmbedlyOembedModel.saveDocuments(embedlyApiResponse, callback);
			});
		};

		return mongoose.models.EmbedlyOembedModel = EmbedlyOembedModel;
	};


} ());