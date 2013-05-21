(function() {
	/**/
	"use strict";

	var UserModel = require('../models/User').compileModel();
	var BoardModel = require('../models/Board').compileModel();

	exports.start = function(app) {

		// show all recent
		// ---------------
		app.get('/users', function(request, response) {
			var page = parseInt(request.params.page, 10) || 1;
			UserModel
				.page(page, function(err, users) {
					if (err) { console.log(err); }
					response.json(users);
				});
		});

		// show one
		// --------
		app.get('/users/:id', function(request, response) {
			UserModel
				.findOne({_id: request.params.id})
				.populate('_boards')
				.exec(function(err, user) {
					if (err) { console.log(err); }
					response.json(user);
				});
		});

	};

} ());