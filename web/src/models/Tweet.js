(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');

	var TweetModel;

	exports.compileModel = function () {

		if (TweetModel) { return TweetModel; }

		var tweetFormat = {

		};

		TweetModel = mongoose.model('Tweet', mongoose.Schema(tweetFormat));
		return TweetModel;
	};

} ());