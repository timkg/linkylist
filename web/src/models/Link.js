var mongoose = require('mongoose');

exports.initLinkModel = function () {
	var linkFormat = {
		"url": String,
		"embedlyRepresentation": mongoose.Schema.Types.ObjectId,
		"readabilityRepresentation": mongoose.Schema.Types.ObjectId,
		"tweets": Array
	};

	return mongoose.model('Link', mongoose.Schema(linkFormat));
};