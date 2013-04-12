(function() {
	/*global window, require*/
	"use strict";

	require({

		baseUrl: '/base',
		paths: {
			'jquery': 'client/vendors/jquery',
			'lo-dash': 'client/vendors/lo-dash',
			'backbone': 'client/vendors/backbone'
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
			'client/src/js/app',
			// 'client/src/js/core/feed_test',
			'client/src/js/core/queue_test'
			// 'client/src/js/ui/itemProvider_test',
			// 'client/src/js/ui/grid/grid_test',
			// 'client/src/js/ui/grid/square_test'
		], function() {
			window.__karma__.start();
	});

}());