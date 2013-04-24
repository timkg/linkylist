({
	baseUrl: ".",
	paths: {
		'jquery': './vendors/jquery',
		'lo-dash': './vendors/lo-dash',
		'backbone': './vendors/backbone',
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
		'masonry': ['jquery'],
		'visible': ['jquery']
	},
	name: "main-dev",
	out: "main-prod.js"
})