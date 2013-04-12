(function() {
	/*global define, require, io*/
	"use strict";

	// queue/feed
	// displayer
	// all else is optional
	define(['lo-dash', 'backbone', './core/feed', './core/queue'], function(_, Backbone, Feed, Queue) {

		var App = {};

		App.events = _.extend({}, Backbone.Events);

		App.initQueue = function(channel) {
			// TODO - check if socket.io is initialized
			var feed = new Feed(io);
			feed.init();
			App.queue = new Queue();
			App.queue.bindFeedTo(channel);
			App.queue.request(channel);
		};

		App.initDisplayer = function() {
			// var size = window.getComputedStyle(document.body,':after').getPropertyValue('content');
			// console.log(size);

			// check resolution
			// use modernizer to check for touch
			// conditionally load correct UI
			require(['ui/streamgrid/grid'], function(StreamGrid) {
				App.displayer = new StreamGrid(App.queue);
				App.displayer.init();
			});
		};

		return App;
	});

}());