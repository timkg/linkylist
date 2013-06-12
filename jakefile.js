(function() {
	/*global desc, task, jake, fail, complete*/
	"use strict";

	var lint = require('./lint_runner.js')
		, nodeunit = require('nodeunit').reporters['default']
		, templatizer = require('templatizer')
		, requirejs = require('requirejs');

	desc('Minify and concatenate main.js via r.js');
	task('rjsMain', ['compileTemplates'], function() {
		var config = rjsBuildConfig();
		requirejs.optimize(config, function (includedModules) {
			console.log(includedModules);
		}, function(err) {
			console.log(err);
		});
	});

	desc('Minify and concatenate JS modules via r.js');
	task('rjsModules', [], function() {
		var modules = new jake.FileList();
		modules.include('./web/public/js/modules/*.js');
		var moduleName, startOfModuleName, endOfModuleName, config;
		modules.forEach(function(modulePath) {
			// I would like to use a regex here, but JS has no lookbehind
			startOfModuleName = modulePath.lastIndexOf('/') + 1;
			endOfModuleName = modulePath.indexOf('.js');
			moduleName = modulePath.substring(startOfModuleName, endOfModuleName);

			config = rjsModuleBuildConfig(moduleName);
			requirejs.optimize(config, function (includedModules) {
				console.log(includedModules);
			}, function(err) {
				console.log(err);
			});
		});
	});



	desc('Compile jade templates for client-side templating');
	task('compileTemplates', [], function() {
		templatizer(__dirname + '/web/src/views/partials', __dirname + '/web/public/js/templates.js');
		console.log('JADE OK');
	});

	desc('Run all tests');
	task('allTests', [
		'dbTests'
		, 'utilsTests'
		, 'serviceTests'
		, 'socketTests'
	], function() {
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


	desc('Default - lint, compileTemplates');
	task('default', ['lint', 'compileTemplates']);


	desc('Lint everything');
	task('lint', [], function() {
		// specifying these tasks as dependencies in the array parameter did not work properly.
		jake.Task['lintServer'].invoke();
		jake.Task['lintClient'].invoke();
	});

	desc('Lint Client code');
	task('lintClient', [], function() {
		var passed = lint.validateFileList(clientLintFiles(), browserLintOptions(), {});
		if (!passed) { fail('lint client failed'); }
		console.log('CLIENT LINT OK\n\n');
	});

	desc('Lint Server code');
	task('lintServer', [], function() {
		var passed = lint.validateFileList(serverLintFiles(), nodeLintOptions(), {});
		if (!passed) { fail('lint server failed'); }
		console.log('SERVER LINT OK\n\n');
	});

	function rjsBuildConfig() {
		// paths should be relative to app root, outsite the ./web folder
		return ({
			baseUrl: './web/public/js',
			mainConfigFile: "./web/public/js/main.js", // tell r.js where to load config
			name: 'main',
			out: './web/public/js/main-prod.js'
		});
	}

	function rjsModuleBuildConfig(moduleName) {
		// paths should be relative to app root, outsite the ./web folder
		return ({
			baseUrl: './web/public/js',
			mainConfigFile: "./web/public/js/main.js", // tell r.js where to load config
			name: 'modules/' + moduleName,
			out: './web/public/js/built/modules/' + moduleName + '.js'
		});
	}

	function clientLintFiles() {
		var files = new jake.FileList();
		files.include('web/public/js/**/*.js');
		files.exclude('web/public/js/vendors/*.js');
		files.exclude('web/public/js/templates.js');
		files.exclude('web/public/js/build.js');
		return files.toArray();
	}

	function serverLintFiles() {
		var files = new jake.FileList();
		files.include('web/**/*.js');
		files.exclude('web/public/**/*.js');
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
			laxcomma: true,
			laxbreak: true,
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