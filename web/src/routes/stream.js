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

					// prepare pagination parameters
					// -----------------------------
					var prev = ((page - 1) > 0 ? page - 1 : null)
					var next = (links.length === 10 ? page + 1 : null)
					if (prev) { prev = '/stream?page=' + prev }
					if (next) { next = '/stream?page=' + next }

					// prepare response data
					// ---------------------
					var data = {
						'connection': uuid.v1()
						, 'page': page
						, 'prev_page': prev
						, 'next_page': next
						, 'payload': links
					};

					// send response to client
					// -----------------------
//					response.render('templates/stream', {links: data});
					response.json(data);

					// check which links were sent without preview
					// -------------------------------------------
					var linksWithoutEmbed = [];
					data.payload.map(function(link) {
						if (!link._embedlyExtract) {
							linksWithoutEmbed.push(link.url);
						}
					});

					// get missing previews and stream to client via socket.io
					// -------------------------------------------------------
					EmbedlyExtractModel.getExtractForUrls(linksWithoutEmbed, function(embeds) {
						socketio.sendToConnection({
							connection: data.connection
							, payload: embeds
						});
					});
				});
		});
	};

} ());