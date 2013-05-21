(function() {
	/*global define, require*/
	"use strict";

	define([
		'/socket.io/socket.io.js'
		, './vendors/lo-dash'
		, 'backbone'
	], function(io, _, Backbone) {

		var App = {};
		App.dependencies = {};

		// App utility methods
		// -------------------
		App.set = function(dependencyName, dependency) {
			App.dependencies[dependencyName] = dependency;
		};
		App.get = function(dependencyName) {
			return App.dependencies[dependencyName];
		};
		App.loadModules = function(modules, fn) {
			modules = _.map(modules, function(moduleName) {
				return './modules/' + moduleName;
			});
			require(modules, function() {
				_.each(arguments, function(module) {
					App.set(module.name, module);
					fn(module);
				});
			});
		};

		// set common dependencies
		// -----------------------
		App.set('io', io);
		App.set('socket', io.connect('http://localhost:5000'));
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