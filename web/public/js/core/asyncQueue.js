(function() {
	/*global define, require, App*/
	"use strict";

	// prevent r.js from optimizing this file by specifying dependency as variable name, not string literal
	var SCOKETIO_CLIENT_SCRIPT_URL = '/socket.io/socket.io.js';
	var SOCKETIO_ENDPOINT = '/';

	define([
		SCOKETIO_CLIENT_SCRIPT_URL,
		'lo-dash',
		'backbone',
		'q',
		'statemachine'

	], function(io, _, Backbone, Q, StateMachine) {

		function Queue() {
			this.items = new Backbone.Collection();
			this.waitingPromises = [];
		}

		Queue.prototype = {};

//		StateMachine.create({
//			target: Queue.prototype,
//			events: [
//				{ name: 'initStateMachine', from: 'none', to: 'empty' },
//				{ name: 'requested', from: 'empty', to: 'waiting' },
//				{ name: 'received', from: 'waiting', to: 'hasitems' },
//				{ name: 'received', from: 'hasitems', to: 'hasitems' },
//				{ name: 'emptied', from: 'hasitems', to: 'empty' },
//				{ name: 'fail', from: 'requeststarted', to: 'error' }
//			]});
//
//		Queue.prototype.onempty = function() {
//			this.request('links');
//			this.requested();
//		};
//
//		Queue.prototype.onenterwaiting = function() {
//			// TODO - show loader / send event
//		};
//
//		Queue.prototype.onleavewaiting = function() {
//			// TODO - remove loader / send event
//		};
//
//		Queue.prototype.onhasitems = function() {
//			this.resolvePromises();
//		};
//
//		Queue.prototype.onerror = function() {
//			// TODO - decide how to show network or other errors
//		};

		Queue.prototype.init = function() {
			this.initSocket();
			this.initCollection();
		};

		Queue.prototype.initSocket = function() {
			if( !io ) {
				throw new Error('asyncQueue requires socket.io instance');
			}
			this.socket = io.connect(SOCKETIO_ENDPOINT);
		};

		Queue.prototype.initCollection = function() {
			this.items.on('add', function() {
				this.received(); // TODO - only call once for whole add operation
			}, this);

			this.items.on('remove', function() {
				if( this.items.length === 0 ) {
					this.emptied();
				}
			}, this);
		};

		Queue.prototype.request = function(request) {
			this.socket.emit(request || 'links');
		};

		Queue.prototype.listenTo = function(eventName, callbackFn) {
			var callback = callbackFn;
			if( !this.connection ) {
				this.init();
			}
			if( !callback ) {
				callback = Queue.prototype.add;
			}
			this.socket.on(eventName, callback.bind(this));
		};

		Queue.prototype.add = function(items) {
			if( _.isString(items) ) {
				items = JSON.parse(items);
			}
			if( !_.isArray(items) ) {
				items = [items];
			}
			var itemArray = [];
			_.each(items, function(item) {
				itemArray.push({
					_base: item
				});
			});
			this.items.add(itemArray);
		};

		Queue.prototype.next = function() {
			var deferred = Q.defer();
			if( this.items.length > 0 ) {
				deferred.resolve(this.items.shift());
			} else {
				this.promiseItem(deferred);
			}
			return deferred.promise;
		};

		Queue.prototype.promiseItem = function(deferred) {
			this.waitingPromises.push(deferred);
		};

		Queue.prototype.resolvePromises = function() {
			while( (this.waitingPromises.length > 0 && this.items.length > 0) ) {
				var deferred = this.waitingPromises.shift();
				deferred.resolve(this.items.shift());
			}
		};

		return Queue;
	});
}());