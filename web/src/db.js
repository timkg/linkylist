(function () {
	/*global */
	"use strict";

	var mongoose = require('mongoose');
	var config = require('../config');

	exports.connect = function (callback) {
		mongoose.connect(config.mongourl);
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', callback);
	};

	exports.disconnect = function(callback) {
		mongoose.connection.close(callback);
	};

}());