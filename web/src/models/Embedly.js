(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');
	var Q = require('q');

	exports.compileModel = function () {

		if (mongoose.models.EmbedlyModel) { return mongoose.models.EmbedlyModel; }

		var embedlyOembedFormat = {
			"provider_url": String,
			"description": String,
			"title": String,
			"url": String,
			"thumbnail_width": Number,
			"thumbnail_url": String,
			"version": String,
			"provider_name": String,
			"type": String,
			"thumbnail_height": Number
		};

		mongoose.models.EmbedlyModel = mongoose.model('Embedly', mongoose.Schema(embedlyOembedFormat));

		mongoose.models.EmbedlyModel.promiseToSave = function(json) {
			if (typeof json === 'string') { json = JSON.parse(json); }

			var deferred = Q.defer();

			mongoose.models.EmbedlyModel.create(json, function(err, embed) {
				if (err) { deferred.reject(new Error(err)); }
				deferred.resolve(embed);
			});

			return deferred.promise;
		};

		return mongoose.models.EmbedlyModel;
	};


} ());