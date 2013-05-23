(function () {
	/*global define, _*/
	"use strict";

	define([
		'lib/socketCollection'
	], function(SocketCollection) {


		var LatestLinkCollection = SocketCollection.extend({
			initialize: function(models, socket) {
				this.socket = socket;
				this.initSocketListeners();
			}
			, socketEvents: {
				'link/add': 'onLinkAdded'
			}
<<<<<<< HEAD
=======
			, initSocketListeners: function() {
				var self = this;
				_.each(this.socketEvents, function(fn, key, obj) {
					if (typeof self[fn] !== 'function') { throw new TypeError('socketEvents needs to hold list of functions'); }
					self.socket.on(key, _.bind(self[fn], self));
				});
			}
>>>>>>> 095f33776c09c2450b31808fd2ec4c5f60e44b7b
			, onLinkAdded: function(link) {
				this.add(link);
			}

		});

		return LatestLinkCollection;

	});

}());