(function() {
	/*global require*/
	"use strict";

	require.config({
		baseUrl: '/js',
		paths: {
			'jquery': './vendors/jquery',
			'lo-dash': './vendors/lo-dash',
			'backbone': './vendors/backbone',
			'backbone.paginator': './vendors/backbone.paginator',
			'text': 'vendors/text',
			'statemachine': './vendors/state-machine',
			'q': './vendors/q',
			'masonry': './vendors/jquery.masonry',
			'imagesLoaded': './vendors/jquery.imagesLoaded',
			'infinitescroll': './vendors/jquery.infinitescroll',
			'visible': './vendors/jquery.visible',
			'App': './app'
		},
		shim: {
			'backbone': {
				deps: ['lo-dash', 'jquery'],
				exports: 'Backbone'
			},
			'backbone.paginator': {
				'deps': ['backbone'],
				'exports': 'Backbone.Paginator'
			},
			'masonry': ['jquery'],
			'visible': ['jquery']
		}
	});

	require(['App'], function(App) {

		window.App = App;

	});
}());