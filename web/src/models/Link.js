(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');

	var LinkModel;

	exports.compileModel = function () {

		if (mongoose.models.LinkModel) { return mongoose.models.LinkModel; }

		var linkFormat = {
			"url": String,
			"_embedly": { type: mongoose.Schema.Types.ObjectId, ref: 'Embedly' },
			"_readability": { type: mongoose.Schema.Types.ObjectId, ref: 'Readability' }
		};

		mongoose.models.LinkModel = mongoose.model('Link', mongoose.Schema(linkFormat));
		return mongoose.models.LinkModel;
	};
} ())