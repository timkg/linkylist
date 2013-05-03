(function() {
	/**/
	"use strict";

	var db = require('../../src/db');
	var LinkModel = require('../../src/models/Link');
	var Link; // inited in compilesModelFromSchema()

	exports.start = function(test) {
		// nodeunit tests run in sequence and setUp() runs for each test,
		// so I use this method to get things going
		db.connect(test.done)
	};

	exports.test_compilesModelFromSchema = function(test) {
		Link = LinkModel.initLinkModel();
		test.ok(Link, 'compiled Link model');
		test.done();
	};

	exports.test_createsLinkInstances = function(test) {
		var l = new Link({
			url: 'http://twitter.com'
		});
		test.ok(l, 'created a Link instance');
		test.done();
	};

	exports.test_savesInstancesToDb = function(test) {
		var link = new Link({
			url: 'http://twitter.com'
		});
		link.save(function(err, result) {
			if( err ) { throw err; }
			test.equals(result.url, 'http://twitter.com', 'created a link instance');
			test.done();
		});
	};

	exports.test_findsLinkByUrl = function(test) {
		Link.find({ url: 'http://twitter.com' }, function(err, results) {
			if( err ) { throw err; }
			test.equals(results.length, 1, 'found a link');
			test.done();
		});
	};

	exports.end = function(test) {
		// nodeunit tests run in sequence and tearDown() runs for each test,
		// so I use this method to clean up after me
		Link.remove({url: 'http://twitter.com'}, function(err) {
			if( err ) { throw err; }
			db.disconnect(test.done);
		});
	};

} ());