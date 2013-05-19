(function() {
	"use strict";

	var connect = require('connect');
	var express = require('express');
	var http = require('http');
	var flashMessages = require('connect-flash');

	var auth = require('./src/auth');
	var db = require('./src/db');
	var config = require('./config');

	exports.start = function() {

		db.connect(function() {

			// express app configuration
			// -------------------------
			var app = express();
			app.use(connect.bodyParser());
			app.use(connect.cookieParser());
			app.use(connect.session({secret: process.env.APP_SECRET}));
			app.use(express.compress());
			app.use(flashMessages());

			// user authentication
			// -------------------
			auth.start(app);

			// view variables
			// --------------
			app.use(function(req, res, next) {
				res.locals.err = req.flash('error');
				res.locals.success = req.flash('success');
				next();
			});

			// static asset serving
			// --------------------
			app.use(express.static(__dirname + '/public'));
			app.get('/public/js/main.js', function(request, response) {
				response.sendfile( __dirname + '/public/js/main-dev.js');
			});

			// start http server
			// -----------------
			var server = http.createServer(app);
			server.listen(config.http_port);
			console.log('server running on port ', config.http_port);

//			var socketio = require('./src/socketio').init(server);

			// start routes
			// ------------
			require('./src/routes/main.js').start(app);

		});
	};
}());