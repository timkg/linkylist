(function() {
	/*global define, require*/
	"use strict";

	define([], function() {

		function Feed(socketIO, events) {
			this.items = [];
			this._options = {};
			this._options.socketIO = socketIO;
			this._options.events = events;
		}

		Feed.prototype = {};

		Feed.prototype.init = function() {
			if( !this._options.socketIO ) {
				throw new Error('Feed requires socket.io instance');
			}
			this.socket = this._options.socketIO.connect('http://localhost:5000');
			if( this._options.events ) {
				this._initListeners();
			}
		};

		Feed.prototype._initListeners = function() {
			for( event in this._options.events ) {
				if( this._options.events.hasOwnProperty(event) ) {
					this.listenTo(event, this._options.events[event]);
				}
			}
		};

		Feed.prototype.listenTo = function(eventName, callback) {
			this.socket.on(eventName, callback);
		};

		Feed.prototype.request = function(requestName) {
			this.socket.emit(requestName);
		};

		
		return Feed;

	});
}());