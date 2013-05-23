(function() {
	/*global define, console*/
	"use strict";

	define([
		'lib/socketModel'
	], function(SocketModel) {

		var LinkModel = SocketModel.extend({

			validate: function(attrs) {
				if (!attrs.url) { throw new TypeError('LinkModel requires url attribute'); }
			}

			, socketEvents: {

			}

			, initialize: function(attrs, app) {
				this.set(attrs, {validate: true});
				this.socket = app.get('socket');
				this.app = app;

				this.socketEvents['link/' + this.get('url')] = 'onExtract';
				this.initSocketListeners();
			}

			, getExtract: function() {
				this.socket.emit('link/get', {url: url});
			}

			, onExtract: function(extract) {
				this.set({_embedlyExtract: extract._embedlyExtract});
			}


		});


		window.LinkModel = LinkModel;
		return LinkModel;

	});

} ());