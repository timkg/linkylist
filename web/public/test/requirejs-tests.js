(function() {
	/*global window, require*/
	"use strict";

	require({

		baseUrl: '/base',
		paths: {
			'jquery': 'web/public/js/vendors/jquery',
			'lo-dash': 'web/public/js/vendors/lo-dash',
			'backbone': 'web/public/js/vendors/backbone',
			'backbone.paginator': 'web/public/js/vendors/backbone.paginator',
			'text': 'web/public/js/vendors/text',
			'statemachine': 'web/public/js/vendors/state-machine',
			'q': 'web/public/js/vendors/q',
			'App': 'web/public/js/app'
		},
		shim: {
			'backbone': {
				deps: ['lo-dash', 'jquery'],
				exports: 'Backbone'
			},
			'backbone.paginator': {
				deps: ['backbone'],
				exports: 'Backbone.Paginator'
			},
			'lo-dash': {
				exports: '_'
			},
			'jquery': {
				exports: '$'
			}
		}

		}, [
			'web/public/js/collections/chatMessageCollection_test'
		], function(chatMessageCollection_test) {
			window.__karma__.start();
	});

}());