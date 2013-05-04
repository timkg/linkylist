(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');

	exports.compileModel = function () {

		if (mongoose.models.LinkModel) { return mongoose.models.LinkModel; }

		var linkFormat = {
			"url": String,
			"_embedly": { type: mongoose.Schema.Types.ObjectId, ref: 'Embedly' },
			"_readability": { type: mongoose.Schema.Types.ObjectId, ref: 'Readability' }
		};

		var LinkModel = mongoose.model('Link', mongoose.Schema(linkFormat));

		LinkModel.findOrCreate = function(query, callback) {
			LinkModel.findOne(query, function(err, link) {
				if (err) { throw err; }
				if (link) { callback(link); }
				if (!link) {
					LinkModel.create({}, function(err, link) {
						if (err) { throw err; }
						callback(link);
					});
				}
			});
		};

		return mongoose.models.LinkModel = LinkModel;
	};
} ())