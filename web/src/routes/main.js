(function() {
	/**/
	"use strict";

	var path = require('path');
	var everyauth = require('everyauth');

	exports.start = function(app) {

		app.set('views', path.join(__dirname, '../views'));
		app.set('view engine', 'jade');
		
		require('./link').start(app);
		require('./search').start(app);
		require('./stream').start(app);

		app.get('/', function(request, response) {
			console.log(request.user);
			response.render('home');
		});

		app.get('/login', function(request, response) {
			console.log('/login');

		});

	};

} ());