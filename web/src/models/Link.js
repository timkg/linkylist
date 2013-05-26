(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');
	var EmbedlyExtractModel = require('../models/EmbedlyExtract').compileModel();
	var io = require('../socketio').io;
	var screenshots = require('../services/screenshots');

	exports.compileModel = function () {

		if (mongoose.models.LinkModel) { return mongoose.models.LinkModel; }

		var linkFormat = {
			"url": { type: String, required: true, unique: true },
			"image": mongoose.Schema.Types.Mixed,
			"_embedlyExtract": { type: mongoose.Schema.Types.ObjectId, ref: 'EmbedlyExtract' },
			"_tweets": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
			"date_added": Date
		};

		var LinkSchema = mongoose.Schema(linkFormat);
		var LinkModel = mongoose.model('Link', LinkSchema);

		// get screenshot, extract and stream to client
		// ----------------------------------
		LinkSchema.post('save', function(link) {
			console.log('LinkSchema post save', link);

			if (!link.image) {
				screenshots.get(link.url, link.id, function(response) {
					link.image = response;
					link.save();
				})
			}

			if (!link._embedlyExtract) {
				EmbedlyExtractModel.getExtractForUrls([link.url], function(embeds) {
					embeds.forEach(function(embed) {
						LinkModel
							.findOne({url: embed.original_url})
							.populate('_embedlyExtract')
							.exec(function(err, link) {
								io.sockets.emit('link/' + link.url, link);
							});
					});
				});
			}

		});

		LinkModel.findOrCreate = function(query, callback) {
			LinkModel.findOne(query, function(err, link) {
				if (err) { callback(err, null); }
				if (link) {
					LinkModel.findOne({_id: link._id}).populate('_embedlyExtract').exec(function(err, link) {
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
						LinkModel.findOne({_id: link._id}).populate('_embedlyExtract').exec(function(err, link) {
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