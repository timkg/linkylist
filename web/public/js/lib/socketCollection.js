(function () {
	/**/
	"use strict";

	define([
		'backbone'
	], function(Backbone) {

		var SocketCollection = Backbone.Collection.extend({

			initSocketListeners: function() {
				if (!this.socketEvents) { return; }
				var self = this;
				_.each(this.socketEvents, function(fn, key, obj) {
					if (typeof self[fn] !== 'function') { throw new TypeError('socketEvents needs to hold list of functions'); }
					self.socket.on(key, _.bind(self[fn], self));
				});
			}

		});

		return SocketCollection;

	});


}());