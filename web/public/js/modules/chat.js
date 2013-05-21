(function () {
	/*global define*/
	"use strict";

	define(['lib/module'], function(Module) {

		var Chat = new Module('chat', {
			init: function(app, ui) {
				this.app = app;
				this.ui = ui;
			}
		});

		return Chat;

	});

}());