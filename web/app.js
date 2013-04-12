(function() {
	"use strict";

	var http = require('http');
	var url = require('url');
	var fs = require('fs');
	var express = require('express');

	var db = require('./src/db');
	var handler = require('./src/requesthandler');
	var config = require('./config');

	var HTTP_PORT = process.env.PORT || 5000;

	exports.start = function() {

		console.log(config.host.url);

		// mongo db is initialized once for the application, not for each request
		// https://groups.google.com/forum/#!msg/node-mongodb-native/mSGnnuG8C1o/Hiaqvdu1bWoJ
		db.connect(function() {

			var app = express();
			var server = http.createServer(app);
			var io = require('socket.io').listen(server);
			io.configure(function () {
				io.set("transports", ["xhr-polling"]);
				io.set("polling duration", 10);
			});

			server.listen(HTTP_PORT);

			app.use(express.static('/css', '../../../client/src/css'));
			app.use(express.static('/js', '../../../client/src/js'));
			app.use(express.static('/vendors', '../../../client/vendors'));

			// TODO - put dev vs prod route init in its own place
			if( config.MODE === 'PRODUCTION' ) {
					app.get('/', function(request, response) {
					console.log('request received');
					response.sendfile('client/src/html/index-prod.html');	
				});
			} else {
				app.get('/', function(request, response) {
					console.log('request received');
					response.sendfile('client/src/html/index-dev.html');
				});
			}
			

			io.sockets.on('connection', function(socket) {
				handler.init(socket, db);
			});
		});
	};
}());