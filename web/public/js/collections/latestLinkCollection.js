(function () {
	/*global define, _*/
	"use strict";

	define(['backbone'], function(Backbone) {

		// TODO - refactor commonality into socketCollection
		var LatestLinkCollection = Backbone.Collection.extend({
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
			, onLinkAdded: function(msg) {

			}

		});

		return LatestLinkCollection;

	});

}());