require.config({
	paths: {
		'jquery': './vendors/jquery',
		'lo-dash': './vendors/lo-dash',
		'backbone': './vendors/backbone',
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

	window.App = App;

});