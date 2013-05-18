(function() {
	/**/
	"use strict";

	var LinkModel = require('../models/Link').compileModel();
	var EmbedlyExtractModel = require('../models/EmbedlyExtract').compileModel(); // used for .populate('_embedlyExtract')
	var TweetModel = require('../models/Tweet').compileModel(); // used for .populate('_tweets')

	exports.start = function(app) {
		app.get('/links', function(request, response) {

		});
		app.get('/link/:id', function(request, response) {

			LinkModel
				.findOne({_id: request.params.id})
				.populate('_tweets')
				.populate('_embedlyExtract')
				.exec(function(err, link) {
					if (err) { throw err; }

					var data = {
						link: link
						, subtitle: (link._embedlyExtract ? link._embedlyExtract.title : '(couldn\'t find the page\'s title, sorry)')
					}
					response.render('link', {data: data})
				});

		});

		app.post('/links/:url', function(request, response) {
			console.log(request.params.url);
			response.json(request.params.url);
		});
	};
} ());