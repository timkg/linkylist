
	define([
		'lib/module'
	], function(Module) {

		var relatedLinks = new Module('related-links', {
			init: function(app, ui) {
				this.app = app;
				this.ui = ui;
			}
		});

		return relatedLinks;

	});