(function() {
	/**/
	"use strict";

	var db = require('../../src/db');
	var LinkModel = require('../../src/models/Link');
	var ReadabilityModel = require('../../src/models/Readability');
	var Link;
	var Readability;
	var _readability;


	exports.start = function(test) {
		// nodeunit tests run in sequence and setUp() runs for each test,
		// so I use this method to get things going
		Readability = ReadabilityModel.initReadabilityModel();
		test.ok(Readability, 'Readability model properly compiled');
		Link = LinkModel.initLinkModel();
		test.ok(Link, 'Link model properly compiled');
		db.connect(test.done);
	};

	exports.createReadabilityDocument = function(test) {
		Readability.create({
			domain: "info.cern.ch",
			next_page_id: null,
			url: "http://info.cern.ch/hypertext/WWW/TheProject.html",
			short_url: "http://rdd.me/nwqc56po",
			author: null,
			excerpt: "The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents. Everything there is online about W3 is linked&hellip;",
			direction: "ltr",
			word_count: 161,
			total_pages: 0,
			content: "omitted for brevity",
			date_published: null,
			dek: null,
			lead_image_url: null,
			title: "World Wide Web",
			rendered_pages: 1
		}, function (err, read) {
			if( err ) { throw err; }
			test.ok(read, 'readability document properly saved');
			test.ok(read._id, 'readability document has an _id');
			_readability = read._id;
			test.done()
		})
	};

	exports.createLinkDocument = function(test) {
		Link.create({
			'url': 'http://info.cern.ch/hypertext/WWW/TheProject.html',
			'_readability': _readability
		}, function (err, link) {
			if( err ) { throw err; }
			test.ok(link, 'Link document properly saved');
			test.done()
		})
	};

	exports.test_findsReadabilityModelViaLinkProperty = function(test) {
		Link
			.findOne({ 'url': 'http://info.cern.ch/hypertext/WWW/TheProject.html' })
			.populate( '_readability' )
			.exec(function(err, link) {
				if( err ) { throw err; }
				test.equals(link._readability.url, 'http://info.cern.ch/hypertext/WWW/TheProject.html', 'link finds Readability via ReadabilityId reference');
				test.done();
			});
	};

	exports.end = function(test) {
		Link.remove({}, function(err) {
			if( err ) { throw err; }
			Readability.remove({}, function(err) {
				if( err ) { throw err; }
				db.disconnect(test.done);
			});
		});
	};

} ());