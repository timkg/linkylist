var path = require("path");

exports.start = function(app) {

	// TODO - static file server for /public
	app.get('/public/js/main.js', function(request, response) {
		response.sendfile( getHomePath() + '/public/js/main-prod.js');
	});

	// TODO - static file server for /public
	app.get('/public/*', function(request, response) {
		response.sendfile( getHomePath() + request.originalUrl);
	});

	app.get('/', function(request, response) {
		console.log('request received');
		response.sendfile( getHomePath() + '/public/html/index-prod.html');
	});
};

function getHomePath() {
	return path.join( __dirname + '../../..' );
}