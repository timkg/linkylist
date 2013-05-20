(function () {
	/**/
	"use strict";

	define(['backbone'], function(Backbone) {

		var ChatMessageCollection = Backbone.Collection.extend({
			initialize: function(models, socket, user) {
				this.socket = socket
				this.user = user;
				this.socket.emit('join', this.user);
				this.initSocketListeners();
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
				this.add({msg: msg});
			}

			, onAnnouncementReceived: function(msg) {
				return msg;
			}
		});

		return ChatMessageCollection;

	});

}());