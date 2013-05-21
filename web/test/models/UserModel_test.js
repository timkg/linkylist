(function () {
	/**/
	"use strict";

	var fs = require('fs');
	var db = require('../../src/db');
	var UserModel = require('../../src/models/User').compileModel();
	var temp_id;

	exports.start = function(test) {
		db.connect(function() {
			UserModel.remove({}, function(err) {
				if (err) { throw err; }
				test.done();
			});
		});
	};

	exports.test_isDefined = function(test) {
		test.ok(UserModel, 'UserModel is defined');
		test.done();
	};

	exports.test_savesInstances = function(test) {
		UserModel.create({name: 'john doe', id: 123}, function(err, user) {
			test.equals(user.name, 'john doe');
			test.done();
		});
	};

	exports.test_savesTwitterOauth = function(test) {
		fs.readFile('./web/test/testdata/twitterOauth.json', 'utf8', function(err, data) {
			if (err) { console.log(err); }
			data = JSON.parse(data);
			UserModel.create(data, function(err, user) {
				test.equals(user.screen_name, 'timkg');
				test.done();
			});
		});
	};

	exports.test_throwsErrorUponDuplication = function(test) {
		fs.readFile('./web/test/testdata/twitterOauth.json', 'utf8', function(err, data) {
			if (err) { console.log(err); }
			data = JSON.parse(data);
			UserModel.create(data, function(err, user) {
				if (err) {
					test.throws(function() {
						throw err;
					});
					test.done();
				}
			});
		});
	};

	exports.test_findOrCreateCreatesNew = function(test) {
		UserModel.findOrCreate({screen_name: 'timkg', id: 234}, function(err, user) {
			temp_id = user.id;
			UserModel.findOrCreate({id: temp_id}, function(err, user2) {
				test.equals(temp_id, user2.id);
				test.done();
			});
		});
	};

	exports.test_findOrCreateFindsExisting = function(test) {
		UserModel.findOrCreate({screen_name: 'LoboMau', id: 345}, function(err, user) {
			test.ok(user._id, 'was properly saved');
			test.done();
		});
	};

	exports.end = function(test) {
		db.disconnect(test.done);
	};

}());