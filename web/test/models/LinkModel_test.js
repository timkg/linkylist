(function() {
	/**/
	"use strict";

	var db = require('../../src/db');
	var LinkModel = require('../../src/models/Link').compileModel();

	exports.start = function(test) {
		// clean test DB before starting tests
		db.connect(function() {
			LinkModel.remove({}, function(err) {
				if( err ) { throw err; }
				test.done();
			});
		});
	};

	exports.test_compilesModelFromSchema = function(test) {
		test.ok(LinkModel, 'compiled Link model');
		test.done();
	};

	exports.test_createsLinkInstances = function(test) {
		var l = new LinkModel({
			url: 'http://twitter.com'
		});
		test.ok(l, 'created a Link instance');
		test.done();
	};

	exports.test_savesInstancesToDb = function(test) {
		var link = new LinkModel({
			url: 'http://twitter.com'
		});
		link.save(function(err, result) {
			if( err ) { throw err; }
			test.equals(result.url, 'http://twitter.com', 'created a link instance');
			test.done();
		});
	};

	exports.test_findsLinkByUrl = function(test) {
		LinkModel.find({ url: 'http://twitter.com' }, function(err, results) {
			if( err ) { throw err; }
			test.equals(results.length, 1, 'found a link');
			test.done();
		});
	};

	exports.test_findsMultipleLinksByArrayOfUrls = function(test) {
		var link2 = new LinkModel({
			url: 'http://google.com'
		});
		link2.save(function(err, result) {
			if( err ) { throw err; }

			LinkModel.find({ url: { $in: ['http://twitter.com', 'http://google.com'] } }, function(err, results) {
				if( err ) { throw err; }
				test.equals(results.length, 2, 'found multiple links with $in');
				test.done();
			});

		});
	};

	exports.test_findOrCreateCreatesNew = function(test) {
		var query = {url: 'http://not.in/db'};
		LinkModel.findOrCreate(query, function(err, link) {
			if (err) { throw err; }
			test.ok(link._id, 'creates a new link document when query does not match');
			test.equals(link.url, 'http://not.in/db', 'creates document with searched url');
			test.done();
		});
	};

	exports.test_findOrCreateFindsExisting = function(test) {
		var query = {url: 'http://twitter.com'};
		LinkModel.findOrCreate(query, function(err, link) {
			test.equals(link.url, 'http://twitter.com', 'finds link document when query matches');
			test.done();
		});
	};

	exports.end = function(test) {
		LinkModel.remove({}, function(err) {
			if( err ) { throw err; }
			db.disconnect(test.done);
		});
	};

} ());