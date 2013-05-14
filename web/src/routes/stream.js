(function() {
	/**/
	"use strict";

	var LinkModel = require('../models/Link').compileModel();
	var EmbedlyExtractModel = require('../models/EmbedlyExtract').compileModel(); // used for .populate('_embedlyExtract')
	var TweetModel = require('../models/Tweet').compileModel(); // used for .populate('_tweets')
	require('mongoose-pagination');
	var socketio = require('../socketio');

	var uuid = require('node-uuid');

	exports.start = function(app) {
		app.get('/stream', function(request, response) {
			var page = parseInt(request.query.page) || 1;
			LinkModel
				.find({})
				.sort('-date_added')
				.populate('_tweets')
				.populate('_embedlyExtract')
				.paginate(page, 10)
				.exec(function(err, links) {
					// TODO - remove duplication with search.js
					var prev = ((page - 1) > 0 ? page - 1 : null)
					var next = (links.length === 10 ? page + 1 : null)
					if (prev) { prev = '/stream?page=' + prev }
					if (next) { next = '/stream?page=' + next }
					var data = {
						'connection': uuid.v1()
						, 'page': page
						, 'prev_page': prev
						, 'next_page': next
						, 'payload': links
					};
					response.render('templates/stream', {links: data});
//					response.json(data);
//					socketio.sendMissingPreviews(data, response);
				});
		});
	};

} ());