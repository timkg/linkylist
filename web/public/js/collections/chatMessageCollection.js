(function () {
	/**/
	"use strict";

	define(['App'], function(App) {

		// TODO - refactor App dependency to constructor argument
		var Backbone = App.get('backbone')
			, _ = App.get('_')
			, user = App.get('user') || {name: 'TestUser'};

		var ChatMessageCollection = Backbone.Collection.extend({
			initialize: function() {
				this.socket = App.get('socket');
				this.initSocketListeners();
				this.socket.emit('join', user.name);
			}
			, socketEvents: {
				'text': 'onTextReceived'
				, 'announcement': 'onAnnouncementReceived'
			}
			, initSocketListeners: function() {
				var self = this;
				_.each(this.socketEvents, function(fn, key, obj) {
					if (!typeof self[fn] === 'function') { throw new TypeError('socketEvents needs to hold list of functions'); }
					self.socket.on(key, _.bind(self[fn], self));
				});
			}
			, onTextReceived: function(msg) {
				console.log(msg);
				debugger;
			}

			, onAnnouncementReceived: function(msg) {
				console.log(msg);
				debugger;
			}
		});

		return ChatMessageCollection;

	});

}());