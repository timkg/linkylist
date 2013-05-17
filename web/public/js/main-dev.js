(function() {
	/*global require*/
	"use strict";

	require.config({
		baseUrl: '/js',
		paths: {
			'zepto': './vendors/zepto',
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

	var dollar = ('__proto__' in {} ? 'zepto' : 'jquery');
	require(['jquery'], function() {
		require(['foundation', 'topbar'], function() {
			$(document).foundation();
			require(['App', 'masonry'], function(App) {
				$('.stream').masonry({
					itemSelector: '.stream-link'
				});
				window.App = App;
			});
		});
	});

}());