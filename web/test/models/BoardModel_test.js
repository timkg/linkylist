(function () {
	/**/
	"use strict";

	var db = require('../../src/db');
	var BoardModel = require('../../src/models/Board').compileModel();

	exports.start = function(test) {
		db.connect(function() {
			BoardModel.remove({}, function(err) {
				if( err ) { throw err; }
				test.done();
			});
		});
	};

	exports.test_boardModelIsDefined = function(test) {
		test.ok(BoardModel, 'compiled properly');
		test.done();
	};


	exports.end = function(test) {
		BoardModel.remove({}, function(err) {
			if( err ) { throw err; }
			db.disconnect(test.done());
		});
	};
}());