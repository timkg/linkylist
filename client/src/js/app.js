(function() {
	/*global define*/
	"use strict";

	// feed
	// displayer
	// all else is optional
	define(['backbone'], function(Backbone) {
		var App = _.extend({}, Backbone.Events);

		return App;
	});

}());