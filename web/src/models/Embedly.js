(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');

	var EmbedlyModel;

	exports.initEmbedlyModel = function () {

		if (EmbedlyModel) { return EmbedlyModel; }

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

		EmbedlyModel = mongoose.model('Embedly', mongoose.Schema(embedlyOembedFormat));
		return EmbedlyModel;
	};


} ());