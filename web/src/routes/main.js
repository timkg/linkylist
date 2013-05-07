(function() {
	/**/
	"use strict";

	var path = require('path');
	var LinkModel = require('../models/Link').compileModel();

	exports.start = function(app, socketio) {

		require('./search').start(app, socketio);
		require('./stream').start(app, socketio);

		app.get('/', function(request, response) {
			response.sendfile( getHomePath() + '/public/html/index-dev.html');
		});

	};

	function getHomePath() {
		return path.join( __dirname + '../../..' );
	}

} ());