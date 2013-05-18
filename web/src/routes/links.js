(function() {
	/**/
	"use strict";

	var LinkModel = require('../models/Link').compileModel();
	var EmbedlyExtractModel = require('../models/EmbedlyExtract').compileModel(); // used for .populate('_embedlyExtract')
	var TweetModel = require('../models/Tweet').compileModel(); // used for .populate('_tweets')

	exports.start = function(app) {
		app.get('/links', function(request, response) {

		});
		app.get('/links/:id', function(request, response) {

			LinkModel
				.findOne({_id: request.params.id})
				.populate('_embedlyExtract')
				.populate('_tweets')
				.exec(function(err, link) {
					if (err) { throw err; }
					response.render('links/link', {link: link})
				});

		});

		app.get('/links/create', function(request, response) {
			response.render('links/create');
		});

		app.post('/links', function(request, response) {
			LinkModel
				.findOrCreate({url: request.body.url}, function(err, link) {
					link
						.populate('_tweets')
						.populate('_embedlyExtract', function(err, link) {
							if (err) { response.render('links/create', {err: err}); }
							response.redirect('/links/'+link._id)
						});
				});
		});
	};
} ());