(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');

	exports.compileModel = function () {

		if (mongoose.models.LinkModel) { return mongoose.models.LinkModel; }

		var linkFormat = {
			"url": { type: String, required: true },
			"_embedlyOembed": { type: mongoose.Schema.Types.ObjectId, ref: 'EmbedlyOembed' },
			"_embedlyExtract": { type: mongoose.Schema.Types.ObjectId, ref: 'EmbedlyExtract' },
			"_readability": { type: mongoose.Schema.Types.ObjectId, ref: 'Readability' },
			"_tweets": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }]
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