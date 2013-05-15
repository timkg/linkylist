(function() {
	/*global desc, task, jake, fail, complete*/
	"use strict";

	var lint = require('./lint_runner.js');
	var nodeunit = require('nodeunit').reporters['default'];
	var templatizer = require('templatizer');

	desc('Compile jade templates for client-side templating');
	task('compileJade', [], function() {
		templatizer(__dirname + '/web/templates/partials', __dirname + '/web/public/js/templates.js');
	});

	desc('Run all tests');
	task('allTests', ['dbTests', 'serviceTests', 'utilsTests', 'socketTests'], function() {
		complete();
	}, {async: true});

	desc('Socket.io tests');
	task('socketTests', [], function() {
		console.log('\n\nSOCKETIO TESTS');
		var testserver = require('./web/test/socketio/socketiotestserver');
		testserver.startTestServer(function() {
			nodeunit.run(['./web/test/socketio/socket_test.js'], null, function(failures) {
				if (failures) { fail('tests failed'); }
				testserver.stopTestServer(complete);
			});
		});
	}, {async: true});


	desc('Service tests');
	task('serviceTests', [], function() {
		console.log('\n\nSERVICE TESTS');
		nodeunit.run(externalServiceTestFiles().toArray(), null, function(failures) {
			if (failures) { fail('tests failed'); }
			complete();
		});
	}, {async: true});

	function externalServiceTestFiles() {
		var files = new jake.FileList();
		files.include('./web/test/services/*_test.js');
		return files;
	}


	desc('DB tests');
	task('dbTests', [], function() {
		console.log('\n\nDB TESTS');
		nodeunit.run(dbTestFiles().toArray(), null, function(failures) {
			if (failures) { fail('tests failed'); }
			complete();
		});
	}, {async: true});

	function dbTestFiles() {
		var files = new jake.FileList();
		files.include('./web/test/models/*_test.js');
		return files;
	}


	desc('utils tests');
	task('utilsTests', [], function() {
		console.log('\n\nUTILS TESTS');
		nodeunit.run(utilsTestFiles().toArray(), null, function(failures) {
			if (failures) { fail('tests failed'); }
			complete();
		});
	}, {async: true});

	function utilsTestFiles() {
		var files = new jake.FileList();
		files.include('./web/test/utils/*_test.js');
		return files;
	}


	desc('Default - lint');
	task('default', ['lint'], function(){
		console.log('\n\nOK');
	});


	desc('Lint everything');
	task('lint', ['lintClient', 'lintServer']);


	desc('Lint Server code');
	task('lintServer', [], function() {
		var passed = lint.validateFileList(serverLintFiles(), nodeLintOptions(), {});
		if (!passed) { fail('lint server failed'); }
	});


	desc('Lint Client code');
	task('lintClient', [], function() {
		var passed = lint.validateFileList(clientLintFiles(), browserLintOptions(), {});
		if (!passed) { fail('lint client failed'); }
	});

	function clientLintFiles() {
		var files = new jake.FileList();
		files.include('web/public/js/**/*.js');
		files.exclude('web/public/js/build.js');
		files.exclude('web/public/js/main-prod.js');
		files.exclude('web/public/js/vendors/*.js');
		return files.toArray();
	}

	function serverLintFiles() {
		var files = new jake.FileList();
		files.include('web/**/*.js');
		files.exclude('web/public/js/**/*.js');
		return files.toArray();
	}

	function nodeLintOptions() {
		var options = lintOptions();
		options.node = true;
		return options;
	}

	function browserLintOptions() {
		var options = lintOptions();
		options.browser = true;
		return options;
	}

	function lintOptions() {
		return {
			bitwise: true,
			curly: true,
			eqeqeq: true,
			forin: true,
			immed: true,
			latedef: true,
			newcap: true,
			noarg: true,
			noempty: true,
			nonew: true,
			regexp: true,
			undef: true,
			strict: true,
			trailing: true
		};
	}

}());