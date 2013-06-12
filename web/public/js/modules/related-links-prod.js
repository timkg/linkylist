
	define('lib/module',[], function() {

		function Module(name, hash) {
			if (!name) { throw new TypeError('Module definition requires a name'); }
			this.name = name;
			for(var key in hash) {
				if (hash.hasOwnProperty(key)) {
					this[key] = hash[key];
				}
			}
		}

		return Module;

	});


	define('modules/related-links',[
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