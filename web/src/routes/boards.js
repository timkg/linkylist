(function() {
	/**/
	"use strict";

	var BoardModel = require('../models/Board').compileModel();
	var UserModel = require('../models/User').compileModel(); // used for .populate('_owner')
	var LinkModel = require('../models/Link').compileModel(); // used for .populate('_links')
	var socketio = require('../socketio');

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
			var boardId = request.params.id;
			socketio.emit('board/' + boardId, request.user);
			BoardModel
				.findOne({_id: boardId})
				.populate('_owner')
				.populate('_links')
				.exec(function(err, board) {
					if (err) { console.log(err); }
					if (!board) {
						request.flash('info', 'The requested board does not exist. Maybe it was deleted.');
						response.redirect('/boards');
						return;
					}
					var viewerIsOwner = false;
					if (request.user && request.user.id === board._owner.id) {
						viewerIsOwner = true;
					}
					board._links = board._links.reverse();
					response.render('boards/board', {board: board, viewerIsOwner: viewerIsOwner});

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
			// TODO - remove duplication with models/Board.js
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