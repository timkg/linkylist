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
			"image": { type: mongoose.Schema.Types.Mixed },
			"preview": { type: mongoose.Schema.Types.Mixed },
			"_tweets": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
			"date_added": Date
		};

		var LinkSchema = mongoose.Schema(linkFormat);
		LinkSchema.plugin(require('mongoose-eventify'));
		var LinkModel = mongoose.model('Link', LinkSchema);

		LinkModel.on('change:image', function(link) {
			console.log('image changed!');
			io.sockets.emit('link/' + link._id + '/update', {image: link.image});
		});
		LinkModel.on('change:preview', function(link) {
			console.log('preview changed!');
			io.sockets.emit('link/' + link._id + '/update', {preview: link.preview});
		});
		LinkModel.on('add', function(link) {
			console.log('link created!');
			io.sockets.emit('link/add', {link: link});
		});

		io.sockets.on('connection', function(socket) {
			socket.on('link/get', function(data) {
				LinkModel.findOne(data, function(err, link) {
					if (err) { console.error(err); }
					if (link && link.url) {
						socket.emit('link/' + link.url, link);
					}
				});
			});
		});

		// get preview from embed.ly before saving
		// ---------------------------------------
		LinkSchema.pre('save', true, function(next, done) {
			next();
			var self = this;
			if (!self.preview) {
				embedlyService.getExtractForUrls([self.url], function(embeds) {
					self.preview = embeds[0];
					done();
				});
			} else {
				done();
			}
		});

		// get screenshot after saving
		// ---------------------------
		LinkSchema.post('save', function(link) {
			if (!link.image) {
				screenshots.get(link.url, link._id, function(response) {
					link.image = response;
					link.save(function(err) {
						if (err) { console.log(err); }
					});
				});
			}
		});

		LinkModel.findOrCreate = function(query) {
			var promise = new mongoose.Promise();

			LinkModel.findOne(query, function(err, link) {
				if (link) {
					promise.resolve(err, link);
				}
				if (!link) {
					if (!query.url) {
						promise.reject('LinkModel.findOrCreate needs object literal with url attribute as argument');
					}
					LinkModel.create({url: query.url, date_added: Date.now(), preview: null}, function(err, link) {
						promise.resolve(err, link);
					});
				}
			});

			return promise;
		};



		mongoose.models.LinkModel = LinkModel;
		return LinkModel;
	};
} ());