var http = require('http');

var TWITTER_SEARCH_BASE_URL = 'http://search.twitter.com/search.json'
var TWITTER_SEARCH_PARAMS = '&filter:links&include_entities=1'

var _nextPageParam;

exports.search = function(searchTerm, callback) {
	var url = TWITTER_SEARCH_BASE_URL + '?q=' + searchTerm + TWITTER_SEARCH_PARAMS;
	var request = http.get(url);
	request.on('response', function(response) {
		console.log('response received from ', url);
		var responseData = '';

		response.setEncoding('utf8');

		response.on('data', function(chunk) {
			responseData += chunk;
		});

		response.on('end', function() {
			var data = JSON.parse(responseData);
			_nextPageParam = data.next_page;
			callback(responseData);
		});
	});
}

exports.next_page = function(callback) {
	var url = TWITTER_SEARCH_BASE_URL + _nextPageParam;
	var request = http.get(url);
	// TODO - extract httpget method
	request.on('response', function(response) {
		console.log('response received from ', url);
		var responseData = '';

		response.setEncoding('utf8');

		response.on('data', function(chunk) {
			responseData += chunk;
		});

		response.on('end', function() {
			var data = JSON.parse(responseData);
			_nextPageParam = data.next_page;
			callback(responseData);
		});
	});
};

exports.getListOfUrlsFromApiResponse = function(data) {
	var parsedJson = JSON.parse(data);
	var urls = [];
	var results = parsedJson.results;
	for( var i = 0, len = results.length; i < len; i++ ) {
		if( results[i].entities && results[i].entities.urls ) {
			var arrayOfUrlsInTweet = results[i].entities.urls;
			for( var j = 0, urlsLen = arrayOfUrlsInTweet.length; j < urlsLen; j++ ) {
				urls.push(arrayOfUrlsInTweet[j].expanded_url);
			}
		}
	}

	return urls;
};