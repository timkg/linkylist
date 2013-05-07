(function() {
	"use strict";

	var express = require('express');
	var http = require('http');

	var db = require('./src/db');
	var config = require('./config');

	exports.start = function() {

		db.connect(function() {

			console.log(config.app_url);

			var app = express();

			// serve all static files in /public
			// /public is not part of the path. /public/js is requested as /js
			app.use(express.static(__dirname + '/public'));
			// except for main.js - serve custom main.js. This file is requested as /public/js
			app.get('/public/js/main.js', function(request, response) {
				response.sendfile( __dirname + '/public/js/main-dev.js');
			});

			var server = http.createServer(app);
			server.listen(config.http_port);

			var socketio = require('./src/socketio').init(server);

			if (config.MODE === 'PRODUCTION') {
				require('./src/routes/prod.js').start(app, socketio);
			} else if (config.MODE === 'DEVELOPMENT') {
				require('./src/routes/main.js').start(app, socketio);
			}

		});
	};
}());