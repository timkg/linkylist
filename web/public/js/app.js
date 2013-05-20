(function() {
	/*global define, require*/
	"use strict";

	define([
		'/socket.io/socket.io.js'
		, 'lo-dash'
		, 'backbone'
//		, './lib/commands'
	], function(io, _, Backbone /*, Commands*/) {

		var App = {};
		App.dependencies = {};
		App.set = function(dependencyName, dependency) {
			if (!App.dependencies[dependencyName]) {
				App.dependencies[dependencyName] = dependency;
			}
		};
		App.get = function(dependencyName) {
			return App.dependencies[dependencyName];
		};

		App.set('socket', io.connect('/'));
		App.set('_', _);
		App.set('backbone', Backbone);
		App.set('user', window.user);

//		App.Events = _.extend({}, Backbone.Events);
//		App.Commands = _.extend({}, new Commands());

		return App;
	});

}());