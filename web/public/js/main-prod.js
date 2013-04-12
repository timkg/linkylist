(function() {
	/*global require*/
	"use strict";

	require.config({
		shim: {
			'backbone': {
				deps: ['lo-dash', 'jquery'],
				exports: 'Backbone'
			},
			'lo-dash': {
				exports: '_'
			}
		}
	});

	require(['./app'], function(App) {

		var app = new App();
		app.init();

	});
}());