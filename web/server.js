(function() {
	"use strict";

	var connect = require('connect');
	var express = require('express');
	var http = require('http');
	var flashMessages = require('connect-flash');

	var auth = require('./src/auth');
	var db = require('./src/db');
	var config = require('./config');

	var cloudinary = require('cloudinary');

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
			app.use(express.errorHandler());
			app.locals.pretty = true;

			// user authentication
			// -------------------
			auth.start(app);

			// static asset serving
			// --------------------
			app.use(express.static(__dirname + '/public'));
			cloudinary.config({
				cloud_name: process.env.CLOUDINARY_CLOUD_NAME
				, api_key: process.env.CLOUDINARY_API_KEY
				, api_secret: process.env.CLOUDINARY_API_SECRET
			});

			// view variables
			// --------------
			app.use(function(req, res, next) {
				res.locals.err = req.flash('error');
				res.locals.success = req.flash('success');
				res.locals.api_key = cloudinary.config().api_key;
				res.locals.cloud_name = cloudinary.config().cloud_name;
				res.locals.cloudinary = cloudinary;
				next();
			});

			// start http server
			// -----------------
			var server = http.createServer(app);
			server.listen(config.http_port);
			console.log('server running on port ', config.http_port);

			// socket.io
			// ---------
			var io = require('./src/socketio').start(server);
			require('./src/chat').start(io);

			// start routes
			// ------------
			require('./src/routes/main.js').start(app);

		});
	};
}());