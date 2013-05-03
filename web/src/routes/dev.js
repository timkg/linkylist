var path = require('path');

exports.start = function(app) {

	app.get('/links/:next_page', function(request, response) {
		// next_page includes searchterm, we can omit the first argument
		twitter.searchTweetsWithUrlsAbout('', function(tweets) {
			response.json(tweets);
		}, decodeURIComponent(request.params.next_page))
	});

	app.get('/links', function(request, response) {
		var searchterm = (request.query && request.query.search ? request.query.search : 'javascript');
		twitter.searchTweetsWithUrlsAbout(searchterm, function(tweets) {
			response.json(tweets);
		});
	});

	// TODO - static file server for /public
	app.get('/public/js/main.js', function(request, response) {
		response.sendfile( getHomePath() + '/public/js/main-dev.js');
	});

	// TODO - static file server for /public
	app.get('/public/*', function(request, response) {
		response.sendfile( getHomePath() + request.originalUrl);
	});

	app.get('/', function(request, response) {
		console.log(getHomePath() + '/public/html/index-dev.html');
		response.sendfile( getHomePath() + '/public/html/index-dev.html');
	});

};

function getHomePath() {
	return path.join( __dirname + '../../..' );
}