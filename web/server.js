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
			var server = http.createServer(app);
			server.listen(config.http_port);

			require('./src/socketio').init(server);

			if( config.MODE === 'PRODUCTION' ) {
				require('./src/routes/prod.js').start(app);
			} else {
				require('./src/routes/dev.js').start(app);
			}

		});
	};
}());