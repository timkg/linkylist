(function() {
	/*global define, require*/
	"use strict";

	define([
		'/socket.io/socket.io.js',
		'jquery',
		'lo-dash',
		'backbone',
		'./lib/commands'
	], function(io, $, _, Backbone, Commands) {

		var App = {};

		App.Events = _.extend({}, Backbone.Events);
		App.Commands = _.extend({}, new Commands());

		App.socket = io.connect('/');

//		App.initDisplayer = function(container) {
//			// check resolution
//			// use modernizer to check for touch
//			// conditionally load correct UI
//			require(['ui/scrollgrid/scrollgrid'], function(ScrollGrid) {
//				App.displayer = new ScrollGrid(App.queue);
//				App.displayer.init( container );
//				App.displayer.start();
//			});
//		};

		return App;
	});

}());