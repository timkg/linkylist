(function() {
	/*global define, require, io*/
	"use strict";

	// prevent r.js from loading this file by specifying dependency as variable name, not string literal
	var SCOKET_SCRIPT_URL = '/socket.io/socket.io.js';

	define([SCOKET_SCRIPT_URL], function(io) {

		var SOCKET_IO_HOST = '/';

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