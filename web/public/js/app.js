(function() {
	/*global define, require*/
	"use strict";

	define([
		'jquery',
		'lo-dash',
		'backbone',
		'./core/queue'
	], function($, _, Backbone, Queue) {

		var App = {};

		App.events = _.extend({}, Backbone.Events);

		App.initQueue = function(channel) {
			App.queue = new Queue();
			App.queue.listenTo(channel);
		};

		App.initDisplayer = function(container) {
			// check resolution
			// use modernizer to check for touch
			// conditionally load correct UI
			require(['ui/scrollgrid/scrollgrid'], function(ScrollGrid) {
				App.displayer = new ScrollGrid(App.queue);
				App.displayer.init( container );
				App.displayer.start();
			});
		};

		return App;
	});

}());