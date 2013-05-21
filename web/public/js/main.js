(function() {
	/*global require*/
	"use strict";

	require.config({
		baseUrl: '/js',
		paths: {
			'jquery': './vendors/jquery',
			'foundation': './vendors/foundation',
			'topbar': './vendors/foundation.topbar',
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
			'app': './app',
			'ui': './ui'
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

	// application kick-off

	require(['app', 'ui'], function(app, ui) {
		window.app = app;
		window.ui = ui;
		app.loadModules(ui.getModules(), function(module) {
			module.init(app, ui);
		});
	});

}());