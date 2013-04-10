(function() {
	/*global define, _*/
	"use strict";

	// queue/feed
	// displayer
	// all else is optional
	define(['backbone', 'queue'], function(Backbone, Queue) {
		var App = _.extend({}, Backbone.Events);

		return App;
	});

}());