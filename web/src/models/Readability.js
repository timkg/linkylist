(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');

	exports.compileModel = function () {

		if (mongoose.models.ReadabilityModel) { return mongoose.models.ReadabilityModel; }

		var readabilityFormat = {
			"content": String,
			"domain": String,
			"author": String,
			"url": String,
			"short_url": String,
			"title": String,
			"excerpt": String,
			"direction": String,
			"word_count": Number,
			"total_pages": Number,
			"date_published": Date,
			"dek": String,
			"lead_image_url": String,
			"next_page_id": Number,
			"rendered_pages": Number
		};

		mongoose.models.ReadabilityModel = mongoose.model('Readability', mongoose.Schema(readabilityFormat));
		return mongoose.models.ReadabilityModel;
	};


} ());