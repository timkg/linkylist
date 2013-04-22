(function() {
	/*global define, require, io*/
	"use strict";

	define([
		'lo-dash',
		'backbone',
		'jquery',
		'./core/connection',
		'./core/queue'
	], function(_, Backbone, $, Connection, Queue) {

		var App = {};

		App.events = _.extend({}, Backbone.Events);

		App.initQueue = function(channel) {
			// TODO - check if socket.io is initialized
			var connection = new Connection(io);
			connection.init();
			App.queue = new Queue(connection);
			App.queue.listenTo(channel);
		};

		App.initDisplayer = function(container) {
			// check resolution
			// use modernizer to check for touch
			// conditionally load correct UI
			require(['ui/scrollgrid/scrollgrid'], function(ScrollGrid) {
				App.displayer = new ScrollGrid(App.queue);
				App.displayer.init( $(container) );
				App.displayer.prepareRow();
			});
		};

		return App;
	});

}());