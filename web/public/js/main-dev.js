(function() {
	/*global require*/
	"use strict";

	require.config({
		paths: {
			'jquery': './vendors/jquery',
			'lo-dash': './vendors/lo-dash',
			'backbone': './vendors/backbone'
		},
		shim: {
			'backbone': {
				deps: ['lo-dash', 'jquery'],
				exports: 'Backbone'
			}
		}
	});

	require(['./app'], function(App) {

		App.initQueue('links');
		App.initDisplayer();

		window.App = App;

	});
}());