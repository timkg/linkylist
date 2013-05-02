exports.initReadabilityModel = function () {

	var readabilityFormat = {

	};

	this.Readability = mongoose.model('Readability', mongoose.Schema(readabilityFormat));
};