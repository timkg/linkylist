(function() {
	/**/
	"use strict";

	var BoardModel = require('../models/Board').compileModel();
	var UserModel = require('../models/User').compileModel(); // used for .populate('_owner')
	var LinkModel = require('../models/Link').compileModel(); // used for .populate('_links')

	exports.start = function(app) {

		// show all recent
		// ---------------
		app.get('/boards', function(request, response) {
			var page = parseInt(request.query.page, 10) || 1;
			BoardModel
				.page(page, function(err, boards) {
					if (err) { console.log(err); }
					response.render('boards/boards', {boards: boards});
				});
		});

		// show one
		// --------
		app.get('/boards/show/:id', function(request, response) {
			BoardModel
				.findOne({_id: request.params.id})
				.populate('_owner')
				.populate('_links')
				.exec(function(err, board) {
					if (err) { console.log(err); }
					// mongoose does not support populate() of nested sub-documents out of the box
					// we need to query the link documents in order to populate their _embedlyExtract sub-documents
					var linkIds = [];
					board._links.forEach(function(link) {
						linkIds.push(link._id);
					});
					LinkModel
						.find({_id: { $in: linkIds }})
						.populate('_embedlyExtract')
						.exec(function(err, links) {
							board._links = links;
							response.render('boards/board', {board: board});
						});
				});
		});

		// create
		// ------
		app.post('/boards', function(request, response) {
			var subject = request.body.subject;
			if (!subject) {
				request.flash('error', 'You need to specify a subject.');
				response.redirect('/boards/create');
				return;
			}
			if (!request.user) {
				request.flash('error', 'You need to sign in to create boards.');
				response.redirect('/boards/create');
				return;
			}

			BoardModel.findOrCreate({
				subject: subject
				, _owner: request.user._id
			}, function(err, board) {
				if (err) {
					response.json(err);
				}
				response.redirect('/boards/show/' + board._id);
			});

		});
		app.get('/boards/create', function(request, response) {
			response.render('boards/create');
		});

		// adding links
		// ------------
		app.post('/boards/:id/links', function(request, response) {
			if (!request.body.url) {
				request.flash('err', 'You need to specify the URL of the link to add');
				response.redirect('/boards/show/' + request.params.id);
				return;
			}
			LinkModel.findOrCreate({url: request.body.url}, function(err, link) {
				BoardModel
					.findOne({_id: request.params.id})
					.exec(function(err, board) {
						if (board._links.indexOf(link._id) === -1) {
							board._links.push(link._id);
							board.save(function(err, board) {
								request.flash('success', 'Link added successfully');
								response.redirect('/boards/show/' + board._id);
							});
						} else {
							request.flash('success', 'Link already was in your board');
							response.redirect('/boards/show/' + board._id);
						}
					});
			});
		});

	};
} ());