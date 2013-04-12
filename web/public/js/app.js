(function() {
	/*global define, _*/
	"use strict";

	// queue/feed
	// displayer
	// all else is optional
	define(['lo-dash', 'backbone', './core/feed', './core/queue'], function(_, Backbone, Feed, Queue) {
		
		var App = {};

		App.events = _.extend({}, Backbone.Events);

		App.initQueue = function(channel) {
			// TODO - check if io initialized
			var feed = new Feed(io);
			feed.init();
			App.queue = new Queue();
			App.queue.bindFeedTo(channel);
			App.queue.request(channel);
		};

		App.initDisplayer = function() {
			// check resolution
			var size = window.getComputedStyle(document.body,':after').getPropertyValue('content');
			console.log(size);
		};

		return App;
	});

}());