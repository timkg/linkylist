(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');
	var LinkModel = require('./Link').compileModel();
	var Q = require('q');

	exports.compileModel = function () {

		if (mongoose.models.EmbedlyModel) { return mongoose.models.EmbedlyModel; }

		var embedlyOembedFormat = {
			"provider_url": { type: String, required: true },
			"description": { type: String, required: true },
			"title": { type: String, required: true },
			"url": { type: String, required: true },
			"thumbnail_width": Number,
			"thumbnail_url": String,
			"version": String,
			"provider_name": String,
			"type": String,
			"thumbnail_height": Number
		};

		var EmbedlyModel = mongoose.model('Embedly', mongoose.Schema(embedlyOembedFormat));

		EmbedlyModel.promiseToSaveSingleValue = function(json) {
			if (typeof json === 'string') { json = JSON.parse(json); }

			var deferred = Q.defer();

			EmbedlyModel.create(json, function(err, embed) {
				if (err) { deferred.reject(new Error(err)); }
				LinkModel.findOrCreate({ url: embed.url}, function(err, link) {
					if (err) { deferred.reject(new Error(err)); }
					link._embedly = embed._id;
					link.url = embed.url;
					link.save(function(err) {
						if (err) { deferred.reject(new Error(err)); }
						deferred.resolve(embed);
					})
				});
			});

			return deferred.promise;
		};

		EmbedlyModel.saveEmbedApiResponse = function(json, callback) {
			if (typeof json === 'string') { json = JSON.parse(json); }
			if (!Array.isArray(json)) { json = [json]; }

			var allOperationsAsPromises = [];
			json.forEach(function(embedValue) {
				allOperationsAsPromises.push(EmbedlyModel.promiseToSaveSingleValue(embedValue));
			});

			Q.allResolved(allOperationsAsPromises)
				.then(function() {
					callback();
				})
				.fail(function(err) {
					console.log(err);
				});
		};

		return mongoose.models.EmbedlyModel = EmbedlyModel;
	};


} ());