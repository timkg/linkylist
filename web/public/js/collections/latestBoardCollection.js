(function () {
	/*global define, _*/
	"use strict";

	define([
		'lib/socketCollection'
	], function(SocketCollection) {

		var LatestBoardCollection = SocketCollection.extend({
			initialize: function(models, socket) {
				this.socket = socket;
				this.initSocketListeners();
			}
			, socketEvents: {
				'board/add': 'onBoardAdded'
			}
			, onBoardAdded: function(board) {
				this.add(board);
			}

		});

		return LatestBoardCollection;

	});

}());