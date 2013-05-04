(function () {
	/**/
	"use strict";

	var url = require('url');

	var DEV_HOST = 'http://localhost';
	var DEV_PORT = '5000';

	var PROD_HOST = 'http://hidden-retreat-7932.herokuapp.com';
	var PROD_PORT = process.env.PORT; // heroku sets port dynamically

	function getTestMongoUrl() {
		return 'mongodb://localhost:27017/test'; // requires mongo installed locally
	}

	function getDevMongoUrl() {
		return 'mongodb://localhost:27017/twitterboards'; // requires mongo installed locally
	}

	function getProductionMongoUrl() {
		return url.parse(process.env.MONGOHQ_URL).href; // set by heroku or .env file
	}

	exports.MODE = (process.argv[2]);
	if (!exports.MODE) { exports.MODE = 'TEST'; }

	if (exports.MODE === 'PRODUCTION') {
		exports.http_port = PROD_PORT;
		exports.app_url = PROD_HOST + ':' + PROD_PORT;
		exports.mongourl = getProductionMongoUrl();
	} else if (exports.MODE === 'DEVELOPMENT') {
		exports.http_port = DEV_PORT;
		exports.app_url = DEV_HOST + ':' + DEV_PORT;
		exports.mongourl = getDevMongoUrl();
	} else {
		exports.http_port = DEV_PORT;
		exports.app_url = DEV_HOST + ':' + DEV_PORT;
		exports.mongourl = getTestMongoUrl();
	}

} ());