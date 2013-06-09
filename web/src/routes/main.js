(function() {
	/**/
	"use strict";

	var path = require('path');
	var url = require('url');
	var everyauth = require('everyauth');

	var LinkModel = require('../models/Link').compileModel();
	var BoardModel = require('../models/Board').compileModel();


	exports.start = function(app) {

		app.set('views', path.join(__dirname, '../views'));
		app.set('view engine', 'jade');

		require('./search').start(app);
		require('./stream').start(app);

		require('./links').start(app);
		require('./users').start(app);
		require('./boards').start(app);

		app.get('/', function(request, response) {
			LinkModel
				.find({})
				.limit(10)
				.sort({'date_added': -1})
				.exec(function(err, links) {
					BoardModel
						.find({})
						.limit(5)
						.populate('_owner')
						.populate('_links')
						.sort({'date_modified': -1})
						.exec(function(err, boards) {
							response.render('home', {boards: boards, links: links} );
						});
				});
		});

	};

} ());