(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');
	var io = require('../socketio').io;
	var screenshots = require('../services/screenshots');
	var embedlyService = require('../services/embedly');

	exports.compileModel = function () {

		if (mongoose.models.LinkModel) { return mongoose.models.LinkModel; }

		var linkFormat = {
			"url": { type: String, required: true, unique: true },
			"image": mongoose.Schema.Types.Mixed,
			"preview": mongoose.Schema.Types.Mixed,
			"_tweets": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
			"date_added": Date
		};

		var LinkSchema = mongoose.Schema(linkFormat);
		var LinkModel = mongoose.model('Link', LinkSchema);

		// get preview from embed.ly before saving
		// ---------------------------------------
		LinkSchema.pre('save', function(next) {
			var self = this;
			if (self.preview) { return; } // only execute if this link has no preview
			embedlyService.getExtractForUrls([self.url], function(embeds) {
				self.preview = embeds[0];
				io.sockets.emit('link/' + self.url, self);
				next();
			});
		});

		// get screenshot after saving
		// ---------------------------
		LinkSchema.post('save', function(link) {
			console.log('start post save');
			if (!link.image) {
				screenshots.get(link.url, link._id, function(response) {
					LinkModel.findOneAndUpdate({_id: link._id}, {image: response}, function(err) {
						if (err) { console.log(err); }
					})
				});
			}
		});

		LinkModel.findOrCreate = function(query, callback) {
			LinkModel.findOne(query, function(err, link) {
				if (err) { callback(err, null); }
				if (link) {
					LinkModel.findOne({_id: link._id}).exec(function(err, link) {
						callback(null, link); // first arg is the error object
						return link;
					});
				}
				if (!link) {
					if (!query.url) {
						callback(new Error('LinkModel.findOrCreate requires object literal with url as argument'), null);
					}
					LinkModel.create({url: query.url, date_added: Date.now(), _tweets: []}, function(err, link) {
						if (err) {
							callback(err, null);
						}
						LinkModel.findOne({_id: link._id}).exec(function(err, link) {
							callback(null, link); // first arg is the error object
						});
					});
				}
			});
		};

		io.sockets.on('connection', function(socket) {
			socket.on('link/get', function(data) {
				console.log('link/get', data);
				LinkModel.findOrCreate(data, function(err, link) {
					console.log('link/' + link.url, link);
					socket.emit('link/' + link.url, link);
				});
			});
		});

		mongoose.models.LinkModel = LinkModel;
		return LinkModel;
	};
} ());