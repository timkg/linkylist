(function () {
	/**/
	"use strict";

	define(['backbone'], function(Backbone) {

		var ChatMessageCollection = Backbone.Collection.extend({
			initialize: function(App) {
				this.App = App;
				this.socket = this.App.get('socket');
				this.initSocketListeners();
				this.socket.emit('join', this.App.get('user').name);
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