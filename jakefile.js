(function() {
	/*global desc, task, jake, fail, complete*/
	"use strict";

	var lint = require('./lint_runner.js');
	var nodeunit = require('nodeunit').reporters['default'];

	desc('External Service tests');
	task('externalServiceTests', [], function() {
		console.log('\n\nEXTERNAL SERVICE TESTS');
		nodeunit.run(externalServiceTestFiles().toArray(), null, function(failures) {
			if (failures) { fail('tests failed'); }
			complete(); // tell jake that this async task is complete
		});
	}, {async: true}); // tell jake to wait for an async task that signalizes it's done with a call to complete()

	function externalServiceTestFiles() {
		var files = new jake.FileList();
//		files.include('./web/test/embedly_test.js');
//		files.include('./web/test/twitter_test.js');
//		files.include('./web/test/readability_test.js');
		files.include('./web/test/services/*_test.js');
		return files;
	}

	desc('Server-side DB tests');
	task('DBTests', [], function() {
		console.log('\n\Server-side DB TESTS');
		nodeunit.run(dbTestFiles().toArray(), null, function(failures) {
			if (failures) { fail('tests failed'); }
			complete(); // tell jake that this async task is complete
		});
	}, {async: true}); // tell jake to wait for an async task that signalizes it's done with a call to complete()

	function dbTestFiles() {
		var files = new jake.FileList();
//		files.include('./web/test/db/*_test.js');
		files.include('./web/test/db/LinkModel_test.js');
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
			bitwise:true,
			curly:true,
			eqeqeq:true,
			forin:true,
			immed:true,
			latedef:true,
			newcap:true,
			noarg:true,
			noempty:true,
			nonew:true,
			regexp:true,
			undef:true,
			strict:true,
			trailing:true
		};
	}

}());