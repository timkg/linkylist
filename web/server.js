(function() {
	"use strict";

	var express = require('express');
	var http = require('http');

	var db = require('./src/db');
	var twitter = require('./src/services/twitter');
	var config = require('./config');

	exports.start = function() {

		// mongo db is initialized once for the application, not for each request
		// https://groups.google.com/forum/#!msg/node-mongodb-native/mSGnnuG8C1o/Hiaqvdu1bWoJ
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