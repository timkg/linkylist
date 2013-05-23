(function () {
	/*global define, console*/
	"use strict";

	define([
		'lib/socketCollection'
	], function(SocketCollection) {

		var LinkboardCollection = SocketCollection.extend({

			socketEvents: {

			}
			, initialize: function(models, app, ui, id) {
				this.app = app;
				this.ui = ui;
				this.id = id;
				this.socket = app.get('socket');
				this.socketEvents['board/' + this.id] = 'onBoardEvents';
				this.initSocketListeners();
			}
			, onBoardEvents: function(param) {
				if (param.error) { console.log('boardEvents error', param.error); }
				if ( 'board/add/link' in param ) {
					this.onLinkAdded(param['board/add/link']);
				}

			}
			, onLinkAdded: function(res) {
				var model = this.findWhere({url: res.url});
				model.set({_embedlyExtract: res._embedlyExtract});
			}

		});

		return LinkboardCollection;

	});


}());