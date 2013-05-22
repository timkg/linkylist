(function () {
	/*global define, _*/
	"use strict";

	define(['backbone'], function(Backbone) {

		// TODO - refactor commonality into socketCollection
		var LatestBoardCollection = Backbone.Collection.extend({
			initialize: function(models, socket) {
				this.socket = socket;
				this.initSocketListeners();
			}
			, socketEvents: {
				'board/add': 'onBoardAdded'
			}
			, initSocketListeners: function() {
				var self = this;
				_.each(this.socketEvents, function(fn, key, obj) {
					if (typeof self[fn] !== 'function') { throw new TypeError('socketEvents needs to hold list of functions'); }
					self.socket.on(key, _.bind(self[fn], self));
				});
			}
			, onBoardAdded: function(board) {
				this.add(board);
			}

		});

		return LatestBoardCollection;

	});

}());