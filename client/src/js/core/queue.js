(function() {
	/*global define, require*/
	"use strict";

	define(['client/src/js/core/feed', 'backbone', 'client/src/js/app'], function(Feed, Backbone, App) {

		function Queue(feed) {
			this._options = {};
			this._options.feed = feed;
			this.items = new Backbone.Collection();
		}

		Queue.prototype = {};

		Queue.prototype.init = function() {
			this.feed = (this._options.feed || new Feed());
			this.items.on('add', function() {
				App.trigger('queue:add');
			});
		};

		Queue.prototype.bindFeedTo = function(eventName, callback) {
			var callback = callback;
			if( !this.feed ) {
				this.init();
			}
			if( !callback ) {
				callback = Queue.prototype.add;
			}
			this.feed.listenTo(eventName, callback.bind(this));
		};

		Queue.prototype.add = function(items) {
			this.items.add(items);
		};

		Queue.prototype.request = function(request) {
			this.feed.request(request);
		};

		Queue.prototype.push = function(item) {
			this.items.add(item);
		};

		Queue.prototype.next = function() {
			return this.items.shift();
		};

		Queue.prototype.at = function(pos) {
			if( pos < 0 || pos >= this.items.length ) {
				throw new Error('Invalid parameter passed to Queue.at');
			}
			var item = this.items.at(pos);
			this.items.remove(item)
			return item;
		};

		// Queue.prototype.searchAndRetrieve = function(searchFn) {
		// 	for( var i = 0, len = this.items.length; i < len; i++ ) {
		// 		if( searchFn(this.items[i]) ) {
		// 			return this.at(i);
		// 		}
		// 	}
		// 	// TODO - if it didn't find, query Feed for more items. needs to accept callback for async
		// 	throw new Error('Queue couldn\'t find item');
		// };

		return Queue;
	});
}());