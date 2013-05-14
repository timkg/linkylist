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

			// static asset serving
			// "/public" is not part of the HHTP path. /public/js/somefile.js is requested as /js/somefile.js
			app.use(express.static(__dirname + '/public'));
			// except for main.js - serve custom main.js for dev vs prod. This file is requested as /public/js/main.js
			app.get('/public/js/main.js', function(request, response) {
				response.sendfile( __dirname + '/public/js/main-dev.js');
			});

			var server = http.createServer(app);
			server.listen(config.http_port);

			var socketio = require('./src/socketio').init(server);

			require('./src/routes/main.js').start(app);

		});
	};
}());