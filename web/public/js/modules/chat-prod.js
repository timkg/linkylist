
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

(function () {
	/*global define*/
	

	define('modules/chat',['lib/module'], function(Module) {

		var Chat = new Module('chat', {
			init: function(app, ui) {
				this.app = app;
				this.ui = ui;
			}
		});

		return Chat;

	});

}());