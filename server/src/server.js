var http = require('http');
var url = require('url');
var fs = require('fs');

var db = require('./db');
var twitter_search = require('./twitter-search.js');
var embedly_oembed = require('./embedly_oembed.js');

var HTTP_PORT = 5000;

exports.start = function() {

	// mongo db should be initialized once for the application, not for each request
	// https://groups.google.com/forum/#!msg/node-mongodb-native/mSGnnuG8C1o/Hiaqvdu1bWoJ
	db.connect(function() {
		var server = http.createServer().listen(HTTP_PORT, function() {
			console.log('server started');
		});

		server.on('request', function(request, response) {
			console.log('request received');

			db.getRecentLinks(function(links){

				response.end(JSON.stringify(links), 'utf8');

			});

			
		});
	});
};	