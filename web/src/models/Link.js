exports.initLinkModel = function () {

	var linkFormat = {
		"url":String,
		"embedlyRepresentation":Schema.Types.ObjectId,
		"readabilityRepresentation":Schema.Types.ObjectId,
		"tweets":Array
	};

	this.Link = mongoose.model('Link', mongoose.Schema(linkFormat));
};