(function() {
	"use strict";

	var connect = require('connect');
	var express = require('express');
	var http = require('http');

	var auth = require('./src/auth');
	var db = require('./src/db');
	var config = require('./config');

	exports.start = function() {

		db.connect(function() {

			var app = express();
			app.use(connect.bodyParser());
			app.use(connect.cookieParser());
			app.use(connect.session({secret: process.env.APP_SECRET}));
			// user authentication
			// -------------------
			auth.start(app);

			// gzip compression
			// ----------------
			app.use(express.compress());


			// static asset serving
			// --------------------
			// "/public" is not part of the HHTP path. /public/js/somefile.js is requested as /js/somefile.js
			app.use(express.static(__dirname + '/public'));
			// except for main.js - serve custom main.js for dev vs prod. This file is requested as /public/js/main.js
			app.get('/public/js/main.js', function(request, response) {
				response.sendfile( __dirname + '/public/js/main-dev.js');
			});

			var server = http.createServer(app);
			server.listen(config.http_port);
			console.log('server running on port ', config.http_port);

//			var socketio = require('./src/socketio').init(server);

			require('./src/routes/main.js').start(app);

		});
	};
}());