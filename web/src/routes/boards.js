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
			var page = parseInt(request.query.page) || 1;
			BoardModel
				.page(page, function(err, boards) {
					if (err) { console.log(err); }
					response.json('boards');
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
					response.render('boards/board', {board: board});
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
		app.put('/boards/:id', function(request, response) {
			response.json(request.body);
			// findOrCreate link
			// save board-link association
		});

	};
} ());