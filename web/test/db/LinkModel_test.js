(function() {
	/**/
	"use strict";

	var db = require('../../src/db');
	var LinkModel = require('../../src/models/Link');
	var Link; // inited in compilesModelFromSchema()

	exports.setUp = function(callback) {
		db.connect(callback)
	};

	exports.tearDown = function(callback) {
		db.disconnect(callback);
	};

	exports.compilesModelFromSchema = function(test) {
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
		link.save(function(err, l) {
			if( err ) { throw err; }
			test.done();
		});

	};

} ());