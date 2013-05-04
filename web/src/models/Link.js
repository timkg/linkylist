(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');

	exports.compileModel = function () {

		if (mongoose.models.LinkModel) { return mongoose.models.LinkModel; }

		var linkFormat = {
			"url": { type: String, required: true },
			"_embedly": { type: mongoose.Schema.Types.ObjectId, ref: 'Embedly' },
			"_readability": { type: mongoose.Schema.Types.ObjectId, ref: 'Readability' }
		};

		var LinkModel = mongoose.model('Link', mongoose.Schema(linkFormat));

		LinkModel.findOrCreate = function(query, callback) {
			LinkModel.findOne(query, function(err, link) {
				if (err) { callback(err, null); }
				if (link) { callback(null, link); } // first arg is the error object
				if (!link) {
					if (!query.url) {
						callback(new Error('LinkModel.findOrCreate requires object literal with url as argument'), null);
					}
					LinkModel.create({url: query.url}, function(err, link) {
						if (err) { callback(err, null); }
						callback(null, link); // first arg is the error object
					});
				}
			});
		};

		return mongoose.models.LinkModel = LinkModel;
	};
} ())