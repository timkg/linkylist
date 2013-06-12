(function() {
	/*global define, require*/
	"use strict";

	// prevent from getting indexed by r.js
	var socketIOClient = '/socket.io/socket.io.js';

	define([
		socketIOClient
		, 'lo-dash'
		, 'backbone'
	], function(io, _, Backbone) {

		var App = {};
		App.dependencies = {};
		App.modules = [];

		// App utility methods
		// -------------------
		App.set = function(dependencyName, dependency) {
			App.dependencies[dependencyName] = dependency;
		};
		App.get = function(dependencyName) {
			if (dependencyName in App.dependencies) { return App.dependencies[dependencyName]; }
			for(var i=0; i<App.modules.length; i++) {
				if (App.modules[i].name && App.modules[i].name === dependencyName) {
					return App.modules[i];
				}
			}
		};
		App.loadModules = function(modules, fn) {
			modules = _.map(modules, function(moduleName) {
				return './modules/' + moduleName;
			});
			require(modules, function() {
				_.each(arguments, function(module) {
					App.modules.push(module);
					fn(module);
				});
			});
		};
		App.isUrl = function(s) {
			var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
			return regexp.test(s);
		};

		// set common dependencies
		// -----------------------
		App.set('io', io);
		App.set('socket', io.connect('/'));
		App.set('_', _);
		App.set('backbone', Backbone);
		App.set('user', window.user);

		// App is an event hub
		// -------------------
		_.extend(App, Backbone.Events);

		// additionally save events as dependency to allow event mixin into other modules
		// ------------------------------------------------------------------------------
		App.set('events', _.extend({}, Backbone.Events));

		return App;
	});

}());