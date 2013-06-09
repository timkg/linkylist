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
				var _ = app.get('_');
				this.set(attrs, {validate: true});
				this.socket = app.get('socket');
				this.app = app;
				this.socketEvents['link/' + this.get('url')] = 'onGet';
				this.initSocketListeners();
				this.socket.emit('link/get', {url: this.get('url')});
				this.socket.on('link/'+this.get('_id')+'/update', _.bind(this.onUpdate.bind, this));
			}
			, onGet: function(model) {
				console.log('onGet', model);
				this.set(model);
			}
			, onUpdate: function(attrs) {
				console.log('onUpdate', attrs);
				this.set(attrs);
			}

		});

		return LinkModel;
	});

} ());