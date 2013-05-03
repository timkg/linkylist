(function() {
	/**/
	"use strict";

	var db = require('../../src/db');
	var ReadabilityModel = require('../../src/models/Readability');
	var Readability; // inited in compilesModelFromSchema()

	exports.start = function(test) {
		// nodeunit tests run in sequence and setUp() runs for each test,
		// so I use this method to get things going
		db.connect(test.done);
	};

	exports.test_compilesModelFromSchema = function(test) {
		Readability = ReadabilityModel.compileModel();
		test.ok(Readability, 'compiled Readability model');
		test.done();
	};

//	exports.test_createsReadabilityInstances = function(test) {
//		var read = new Readability({
//			url: "http://info.cern.ch/hypertext/WWW/TheProject.html"
//		});
//		test.ok(read, 'created a Readability instance');
//		test.done();
//	};

	exports.test_savesInstancesToDb = function(test) {
		var read = new Readability({
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
		});
		read.save(function(err, result) {
			if( err ) { throw err; }
			test.equals(result.url, 'http://info.cern.ch/hypertext/WWW/TheProject.html', 'created a Readability instance');
			test.done();
		});
	};

	exports.test_findsReadabilityByUrl = function(test) {
		Readability.find({ url: 'http://info.cern.ch/hypertext/WWW/TheProject.html' }, function(err, results) {
			if( err ) { throw err; }
			test.equals(results.length, 1, 'found a Readability');
			test.done();
		});
	};

	exports.end = function(test) {
		// nodeunit tests run in sequence and tearDown() runs for each test,
		// so I use this method to clean up after me
		Readability.remove({}, function(err) {
			if( err ) { throw err; }
			db.disconnect(test.done);
		});
	};

} ());