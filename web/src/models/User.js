(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');
	var paginate = require('mongoose-pagination');

	exports.compileModel = function () {

		if (mongoose.models.UserModel) { return mongoose.models.UserModel; }

		var userFormat = {
			_boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
			_links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
			id: { type: Number, unique: true},
			id_str: String,
			name: String,
			screen_name: String,
			location: String,
			url: String,
			description: String,
			time_zone: String,
			lang: String,
			profile_image_url: String,
			profile_image_url_https: String
		};

		var UserModel = mongoose.model('User', mongoose.Schema(userFormat));

		UserModel.findOrCreate = function(twitterUser, callback) {
			UserModel.findOne({id: twitterUser.id}, function(err, user) {
				if (err) { callback(err, null); }
				if (user) {
					callback(null, user); // first arg is the error object
					return user;
				}
				if (!user) {
					if (!twitterUser.id) {
						callback(new Error('UserModel.findOrCreate requires twitter oAuth API response as argument'), null);
					}
					UserModel.create(twitterUser, function(err, user) {
						if (err) {
							callback(err, null);
						}
						callback(null, user); // first arg is the error object
					});
				}
			});
		};

		UserModel.page = function(page, callback) {
			UserModel
				.find({})
				.paginate(page, 10)
				.exec(function(err, json) {
					callback(err, json);
				});
		};

		return mongoose.models.UserModel = UserModel;
	};
} ())