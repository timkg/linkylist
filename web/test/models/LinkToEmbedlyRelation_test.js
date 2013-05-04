(function() {
	/**/
	"use strict";

	var db = require('../../src/db');
	var LinkModel = require('../../src/models/Link').compileModel();
	var EmbedlyModel = require('../../src/models/Embedly').compileModel();
	var embedlyId;


	exports.start = function(test) {
		db.connect(test.done);
	};

	exports.createEmbedlyDocument = function(test) {
		EmbedlyModel.create({
			"provider_url":"http://www.aplitrak.com", "description":"A hot content driven London based agency are on the lookour for a capable and ambitious new front end developer to join their fast growing team - taking the reigns on a range of brand new and existing projects for some of the countrys favourite entertainment entities!", "title":"London - up to \u00a340k - Front End Developer / HTML5 / CSS3", "url":"http://www.aplitrak.com/?adid=Y2FtZXJvbmMuNzE0NDUudHdpQGV4cGxvcmVyZWMuYXBsaXRyYWsuY29t", "thumbnail_width":48, "thumbnail_url":"http://www.aplitrak.com/twitter/twitter_logo_normal.jpg", "version":"1.0", "provider_name":"Aplitrak", "type":"link", "thumbnail_height":48
		}, function (err, embed) {
			if( err ) { throw err; }
			test.ok(embed, 'embed document properly saved');
			test.ok(embed._id, 'embed document has an _id');
			embedlyId = embed._id;
			test.done();
		})
	};

	exports.createLinkDocument = function(test) {
		LinkModel.create({
			'url': 'http://www.aplitrak.com/?adid=Y2FtZXJvbmMuNzE0NDUudHdpQGV4cGxvcmVyZWMuYXBsaXRyYWsuY29t',
			'_embedly': embedlyId
		}, function (err, link) {
			if( err ) { throw err; }
			test.ok(link, 'Link document properly saved');
			test.done()
		})
	};

	exports.test_findsEmbedModelViaLinkProperty = function(test) {
		LinkModel
			.findOne({ 'url': 'http://www.aplitrak.com/?adid=Y2FtZXJvbmMuNzE0NDUudHdpQGV4cGxvcmVyZWMuYXBsaXRyYWsuY29t' })
			.populate( '_embedly' )
			.exec(function(err, link) {
				if( err ) { throw err; }
				test.equals(link._embedly.provider_url, 'http://www.aplitrak.com', 'link finds embedly via embedlyId reference');
				test.done();
			});
	};

	exports.end = function(test) {
		LinkModel.remove({}, function(err) {
			if( err ) { throw err; }
			EmbedlyModel.remove({}, function(err) {
				if( err ) { throw err; }
				db.disconnect(test.done);
			});
		});
	};

} ());