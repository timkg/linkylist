(function() {
	/*global require*/
	"use strict";

	require.config({
		baseUrl: '/js',
		paths: {
			'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min',
			'foundation': './vendors/foundation',
			'topbar': './vendors/foundation.topbar',
			'lo-dash': './vendors/lo-dash',
			'backbone': './vendors/backbone',
			'backbone.paginator': './vendors/backbone.paginator',
			'masonry': './vendors/jquery.masonry',
			'imagesLoaded': './vendors/jquery.imagesLoaded',
			'app': './app',
			'ui': './ui'
		},
		shim: {
			'topbar': {
				deps: ['foundation']
			},
			'foundation': {
				deps: ['jquery']
			},
			'backbone': {
				deps: ['lo-dash', 'jquery'],
				exports: 'Backbone'
			},
			'backbone.paginator': {
				'deps': ['backbone'],
				'exports': 'Backbone.Paginator'
			}
		}
	});

	require(['app', 'ui'], function(app, ui) {
		window.app = app;
		window.ui = ui;
		app.loadModules(ui.getModules(), function(module) {
			module.init.call(module, app, ui);
		});
	});

}());