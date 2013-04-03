var http = require('http');
var url = require('url');
var fs = require('fs');

var twitter_search = require('./twitter_search.js');
var embedly_oembed = require('./embedly_oembed.js');

var SEARCH_PARAM = 'q';

exports.start = function() {
	var server = http.createServer().listen(8080, function() {
		console.log('server started');	
	});

	server.on('request', function(request, response) {
		console.log('request received');

		fs.readFile('./server/src/exampleEmbedlyOembedResponse.json', {encoding: 'utf8'}, function(err, data) {
			if( err ) throw err;
			response.write(data, 'utf8');
			response.end();
		});

		// var searchTerm = getSearchQuery(request);
		// fs.readFile('./exampleResponse.json', {encoding: 'utf8'}, function(err, data) {
		// 	if(err) throw err;
		// 	var urls = twitter_search.getListOfUrlsFromApiResponse(data);
		// 	embedly_oembed.getUrls(urls, function(embedlyApiResponse) {
		// 		console.log(embedlyApiResponse);
		// 	});
		// });

		// twitter_search.search(searchTerm, function(tweets) {
		// 	var urls = twitter_search.getListOfUrlsFromApiResponse(tweets);
		// 	embedly_oembed.getOembedForListOfUrls(urls, function(oembed) {
		// 		response.end(oembed);
		// 	});
		// });

	});	
};

function getSearchQuery(request) {
	var url_parts = url.parse(request.url, true);
	var queryString = url_parts.query;
	return queryString[SEARCH_PARAM];
}