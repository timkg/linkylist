(function() {
	/**/
	"use strict";

	var path = require('path');

	exports.start = function(app) {

		app.set('views', path.join(__dirname, '../views'));
		app.set('view engine', 'jade');

		require('./link').start(app);
		require('./search').start(app);
		require('./stream').start(app);

		app.get('/', function(request, response) {
			response.render('layouts/index.jade');
		});

	};

} ());