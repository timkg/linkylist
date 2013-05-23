(function () {
<<<<<<< HEAD
	/*global define, _*/
=======
	/**/
>>>>>>> 095f33776c09c2450b31808fd2ec4c5f60e44b7b
	"use strict";

	define([
		'backbone'
	], function(Backbone) {

		var SocketCollection = Backbone.Collection.extend({

			initSocketListeners: function() {
				if (!this.socketEvents) { return; }
				var self = this;
<<<<<<< HEAD
				_.each(this.socketEvents, function(fnName, key, obj) {
					if (typeof self[fnName] !== 'function') { throw new TypeError('socketEvents needs to hold list of strings of function names'); }
					self.socket.on(key, _.bind(self[fnName], self));
=======
				_.each(this.socketEvents, function(fn, key, obj) {
					if (typeof self[fn] !== 'function') { throw new TypeError('socketEvents needs to hold list of functions'); }
					self.socket.on(key, _.bind(self[fn], self));
>>>>>>> 095f33776c09c2450b31808fd2ec4c5f60e44b7b
				});
			}

		});

		return SocketCollection;

	});


}());