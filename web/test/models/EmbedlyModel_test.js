(function() {
	/**/
	"use strict";

	var db = require('../../src/db');
	var EmbedlyModel = require('../../src/models/Embedly').compileModel();
	var LinkModel = require('../../src/models/Link').compileModel();

	exports.start = function(test) {
		// clean test DB before starting tests
		db.connect(function() {
			EmbedlyModel.remove({}, function(err) {
				if( err ) { throw err; }
				test.done();
			});
		});
	};

	exports.test_compilesModelFromSchema = function(test) {
		test.ok(EmbedlyModel, 'compiled Embedly model');
		test.done();
	};

	exports.test_createsEmbedlyInstances = function(test) {
		var emb = new EmbedlyModel({
			"provider_url":"http://www.aplitrak.com", "description":"A hot content driven London based agency are on the lookour for a capable and ambitious new front end developer to join their fast growing team - taking the reigns on a range of brand new and existing projects for some of the countrys favourite entertainment entities!", "title":"London - up to \u00a340k - Front End Developer / HTML5 / CSS3", "url":"http://www.aplitrak.com/?adid=Y2FtZXJvbmMuNzE0NDUudHdpQGV4cGxvcmVyZWMuYXBsaXRyYWsuY29t", "thumbnail_width":48, "thumbnail_url":"http://www.aplitrak.com/twitter/twitter_logo_normal.jpg", "version":"1.0", "provider_name":"Aplitrak", "type":"link", "thumbnail_height":48
		});
		test.ok(emb, 'created an Embedly instance');
		test.done();
	};

	exports.test_savesInstancesToDb = function(test) {
		var emb = new EmbedlyModel({
			"provider_url":"http://www.aplitrak.com", "description":"A hot content driven London based agency are on the lookour for a capable and ambitious new front end developer to join their fast growing team - taking the reigns on a range of brand new and existing projects for some of the countrys favourite entertainment entities!", "title":"London - up to \u00a340k - Front End Developer / HTML5 / CSS3", "url":"http://www.aplitrak.com/?adid=Y2FtZXJvbmMuNzE0NDUudHdpQGV4cGxvcmVyZWMuYXBsaXRyYWsuY29t", "thumbnail_width":48, "thumbnail_url":"http://www.aplitrak.com/twitter/twitter_logo_normal.jpg", "version":"1.0", "provider_name":"Aplitrak", "type":"link", "thumbnail_height":48
		});
		emb.save(function(err, result) {
			if( err ) { throw err; }
			test.equals(result.provider_url, 'http://www.aplitrak.com', 'created an embedly instance');
			test.done();
		});
	};

	exports.test_findsEmbedliesByUrl = function(test) {
		EmbedlyModel.find({ url: 'http://www.aplitrak.com/?adid=Y2FtZXJvbmMuNzE0NDUudHdpQGV4cGxvcmVyZWMuYXBsaXRyYWsuY29t' }, function(err, results) {
			if( err ) { throw err; }
			test.equals(results.length, 1, 'found a link');
			test.done();
		});
	};

	exports.test_savesResponseFromServiceRequestWithLinkRelation = function(test) {

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

		EmbedlyModel.saveDocuments(json, function() {
			LinkModel
				.findOne({url: 'http://embed.ly/docs/embed/api'})
				.populate('_embedly')
				.exec(function(err, result) {
					if (err) { throw err; }
					test.ok(result._id, 'created link');
					test.equals(result._embedly.provider_name, 'Embed', 'found associated Embed');
					test.done();
				}
			);
		});

	};

	exports.end = function(test) {
		EmbedlyModel.remove({}, function(err) {
			if( err ) { throw err; }
			db.disconnect(test.done);
		});
	};

}());