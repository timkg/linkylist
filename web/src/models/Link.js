var mongoose = require('mongoose');

exports.initLinkModel = function () {
	var linkFormat = {
		"url": String,
		"_embedly": { type: mongoose.Schema.Types.ObjectId, ref: 'Embedly' },
		"_readability": { type: mongoose.Schema.Types.ObjectId, ref: 'Readability' },
		"tweets": Array
	};

	return mongoose.model('Link', mongoose.Schema(linkFormat));
};