(function() {
	"use strict";

	var express = require('express');
	var http = require('http');

	var db = require('./src/db');
	var handler = require('./src/requesthandler');
	var config = require('./config');

	var HTTP_PORT = process.env.PORT || 5000;

	exports.start = function() {

		// mongo db is initialized once for the application, not for each request
		// https://groups.google.com/forum/#!msg/node-mongodb-native/mSGnnuG8C1o/Hiaqvdu1bWoJ
		db.connect(function() {

			console.log(config.host.url);

			var app = express();
			var server = http.createServer(app);
			server.listen(HTTP_PORT);

			// TODO - figure out why static file server doesn't work
			// app.configure(function() {
				// app.use(express.static(__dirname + '/public'));
			// });

			var io = require('socket.io').listen(server);
			io.configure(function () {
				io.set("transports", ["xhr-polling"]);
				io.set("polling duration", 10);
				io.set('log level', 1);
			});
			io.sockets.on('connection', function(socket) {
				handler.init(socket, db);
			});


			// TODO - put dev vs prod routes in their own place
			if( config.MODE === 'PRODUCTION' ) {
				app.get('/public/js/main.js', function(request, response) {
					response.sendfile(__dirname + '/public/js/main-prod.js');
				});
				app.get('/public/*', function(request, response) {
					response.sendfile(__dirname + request.originalUrl);
				});
				app.get('/', function(request, response) {
					console.log('request received');
					response.sendfile(__dirname + '/public/html/index-prod.html');
				});
			} else {
				app.get('/public/js/main.js', function(request, response) {
					response.sendfile(__dirname + '/public/js/main-dev.js');
				});
				app.get('/public/*', function(request, response) {
					response.sendfile(__dirname + request.originalUrl);
				});
				app.get('/', function(request, response) {
					response.sendfile(__dirname + '/public/html/index-dev.html');
				});
			}

		});
	};
}());