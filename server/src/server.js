var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');

var db = require('./db');
var twitter_search = require('./twitter-search.js');
var embedly_oembed = require('./embedly_oembed.js');

var HTTP_PORT = process.env.PORT || 5000;

exports.start = function() {

	// mongo db should be initialized once for the application, not for each request
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

		app.get('/', function(request, response) {
			console.log('request received');
			// db.getRecentLinks(function(links){
			// 	response.end(JSON.stringify(links), 'utf8');
			// });
			response.end('index');
		});

		app.get('/fetch', function(request, response) {
			console.log('request received');
			// db.getRecentLinks(function(links){
			// 	response.end(JSON.stringify(links), 'utf8');
			// });
			response.end('fetch');
		});

		app.get('/socket', function(request, response) {
			console.log('request received');
			response.sendfile('client/test/socket.html');
		});

		io.sockets.on('connection', function (socket) {
			db.getRecentLinks(function(links){
				socket.emit('links', {items: links});
			});
		});

	});
};	