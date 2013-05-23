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
			, initSocketListeners: function() {
				var self = this;
				_.each(this.socketEvents, function(fn, key, obj) {
					if (typeof self[fn] !== 'function') { throw new TypeError('socketEvents needs to hold list of functions'); }
					self.socket.on(key, _.bind(self[fn], self));
				});
			}
			, onLinkAdded: function(link) {
				this.add(link);
			}

		});

		return LatestLinkCollection;

	});

}());