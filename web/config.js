var url = require('url');

var DEV_HOST = 'http://localhost';
var DEV_PORT = '5000';

var PROD_HOST = 'http://hidden-retreat-7932.herokuapp.com';
var PROD_PORT = process.env.PORT; // heroku sets port dynamically

function getDevMongoUrl() {
	return 'mongodb://localhost:27017/test'; // requires mongo installed locally
}

function getProductionMongoUrl() {
	var mongoUrl = url.parse(process.env.MONGOHQ_URL);
	return mongoUrl.href;
}

exports.MODE = (process.argv[2] === 'PRODUCTION' ? 'PRODUCTION' : 'DEVELOPMENT');

if(exports.MODE === 'PRODUCTION') {
	exports.http_port = PROD_PORT;
	exports.app_url = PROD_HOST + ':' + PROD_PORT;
	exports.mongourl = getProductionMongoUrl();
} else {
	exports.http_port = DEV_PORT;
	exports.app_url = DEV_HOST + ':' + DEV_PORT;
	exports.mongourl = getDevMongoUrl();
}