(function() {
	/**/
	"use strict";

	var fs = require('fs');

	var db = require('../../src/db');
	var EmbedlyModel = require('../../src/models/embedly').compileModel();

	var embedly = require('../../src/services/embedly');
	var testUrls = ['http://embed.ly/docs/embed/api', 'http://modernizr.com/docs/'];

	var EMBEDLY_KEY;

	exports.start = function(test) {
		// read api key from .env file
		fs.readFile('./.env', 'utf8', function(err, data) {
			if(err) { throw err; }
			var lines = data.split('\n');
			lines.forEach(function(line) {
				var parts = line.split('=');
				if( parts[0] === 'EMBEDLY' ) {
					EMBEDLY_KEY = parts[1];
				}
			});
			db.connect(function(err) {
				if (err) { throw err; }
				EmbedlyModel.remove({}, function(err) {
					if (err) { throw err; }
					test.done();
				});
			});

		});
	};

	// uncomment to actually request things from embed.ly API
//	exports.test_getOembedForListOfUrls = function(test) {
//
//		embedly.getOembedForListOfUrls(testUrls, function(responseData) {
//			var data = JSON.parse(responseData);
//			console.log(data);
//			test.ok(Array.isArray(data), 'embedly returns array with data');
//			test.ok(data[0].url, 'first child has an URL property');
//			test.done();
//		}, EMBEDLY_KEY);
//	};

	exports.test_saveEmbedData = function(test) {

		var json = JSON.stringify(
			[
				{
					provider_url: 'http://embed.ly',
					description: 'Embed offers a REST API endpoint: oEmbed, that takes in a URL and passes back data about it.',
					title: 'Embedly | Embed - API',
					mean_alpha: 32.7480314961,
					thumbnail_width: 399,
					url: 'http://embed.ly/docs/embed/api',
					thumbnail_url: 'http://embed.ly/static/images/logos/logo_color.png?v=4b245',
					version: '1.0',
					provider_name: 'Embed',
					type: 'link',
					thumbnail_height: 127
				},
				{
					provider_url: 'http://modernizr.com',
					description: 'Modernizr is an open-source JavaScript library that helps you build the next generation of HTML5 and CSS3-powered websites.',
					title: 'Modernizr Documentation',
					url: 'http://modernizr.com/docs/',
					thumbnail_width: 100,
					thumbnail_url: 'http://modernizr.com/i/img/Alexander-Farkas.jpg',
					version: '1.0',
					provider_name: 'Modernizr',
					type: 'link',
					thumbnail_height: 100
				}
			]
		);

		embedly.saveEmbedData(json, function() {
			EmbedlyModel
				.find({url: {$in: testUrls}})
				.exec(function(err, result) {
					if (err) { throw err; }
					test.equals(result.length, 2, 'found both embeds');
					test.done();
				}
			);
		});

	};

	exports.end = function(test) {
		EmbedlyModel.remove({}, function(err) {
			if (err) { throw err; }
			db.disconnect(test.done);
		});
	};

}());