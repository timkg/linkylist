(function () {
	/*global define, _*/
	"use strict";

	define([
		'backbone'
	], function(Backbone) {

		var SocketModel = Backbone.Model.extend({

			initSocketListeners: function() {
				if (!this.socketEvents) { return; }
				var self = this;
				_.each(this.socketEvents, function(fnName, key, obj) {
					if (typeof self[fnName] !== 'function') { throw new TypeError('socketEvents needs to hold list of strings of function names'); }
					self.socket.on(key, _.bind(self[fnName], self));
				});
			}

		});

		return SocketModel;

	});


}());