(function () {
	/*global */
	"use strict";

	var url = require('url');
	var mongoose = require('mongoose');
	var db; // initialized in connect()
	var config = require('../config');

	exports.connect = function (callback) {
		mongoose.connect(config.mongourl);
		db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', callback);
	};

	exports.disconnect = function(callback) {
		mongoose.connection.close(callback);
	};

	exports.showModels = function () {
		console.log(mongoose.modelNames());
	};

}());