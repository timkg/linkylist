(function() {
	/**/
	"use strict";

	var path = require('path');
	var everyauth = require('everyauth');

	exports.start = function(app) {

		app.set('views', path.join(__dirname, '../views'));
		app.set('view engine', 'jade');

		require('./search').start(app);
		require('./stream').start(app);

		require('./links').start(app);
		require('./users').start(app);
		require('./boards').start(app);

		app.get('/', function(request, response) {
			response.render('home');
		});

	};

} ());