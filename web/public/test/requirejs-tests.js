(function() {
	/*global window, require*/
	"use strict";

	require({

		baseUrl: '/base',
		paths: {
			'jquery': 'web/public/js/vendors/jquery',
			'lo-dash': 'web/public/js/vendors/lo-dash',
			'backbone': 'web/public/js/vendors/backbone',
			'text': 'web/public/js/vendors/text',
			'statemachine': 'web/public/js/vendors/state-machine',
			'q': 'web/public/js/vendors/q'
		},
		shim: {
			'backbone': {
				deps: ['lo-dash', 'jquery'],
				exports: 'Backbone'
			},
			'lo-dash': {
				exports: '_'
			},
			'jquery': {
				exports: '$'
			}
		}

		}, [
			// 'web/public/js/app',
			'web/public/js/core/feed_test',
			'web/public/js/core/queue_test'
			// 'web/public/js/ui/itemProvider_test',
			// 'web/public/js/ui/scrollgrid/scrollgrid_test',
			// 'web/public/js/ui/scrollgrid/square_test'
		], function() {
			window.__karma__.start();
	});

}());