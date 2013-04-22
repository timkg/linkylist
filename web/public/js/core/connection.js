(function() {
	/*global define, require, io*/
	"use strict";

	define(['/socket.io/socket.io.js'], function(io) {

		var SOCKET_IO_HOST = 'http://localhost:5000';

		function Connection(events) {
			this.items = [];
			this._options = {};
			this._options.events = events;
		}

		Connection.prototype = {};

		Connection.prototype.init = function() {
			if( !io ) {
				throw new Error('Connection requires socket.io instance');
			}
			this.socket = io.connect(SOCKET_IO_HOST);
			if( this._options.events ) {
				this._initListeners();
			}
		};

		Connection.prototype._initListeners = function() {
			for( var event in this._options.events ) {
				if( this._options.events.hasOwnProperty(event) ) {
					this.listenTo(event, this._options.events[event]);
				}
			}
		};

		Connection.prototype.listenTo = function(eventName, callback) {
			this.socket.on(eventName, callback);
		};

		Connection.prototype.request = function(requestName) {
			this.socket.emit(requestName);
		};

		return Connection;

	});
}());