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
			, onLinkAdded: function(link) {
				this.add(link);
			}

		});

		return LatestLinkCollection;

	});

}());