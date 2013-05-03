(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');

	var LinkModel;

	exports.compileModel = function () {

		if (LinkModel) { return LinkModel; }

		var linkFormat = {
			"url": String,
			"_embedly": { type: mongoose.Schema.Types.ObjectId, ref: 'Embedly' },
			"_readability": { type: mongoose.Schema.Types.ObjectId, ref: 'Readability' },
			"tweets": Array
		};

		LinkModel = mongoose.model('Link', mongoose.Schema(linkFormat));
		return LinkModel;
	};
} ())