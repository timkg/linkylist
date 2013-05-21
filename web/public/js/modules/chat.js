(function () {
	/**/
	"use strict";

	define([], function() {

		var Chat = {};
		Chat.name = 'chat';
		Chat.init = function(app, ui) {
			this.app = app;
			this.ui = ui;
			console.log('chat here');
		};

		return Chat;

	});

}());