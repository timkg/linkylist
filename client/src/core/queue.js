define(['client/src/core/feed'], function(Feed) {

	function Queue(feed) {
		this.registerFeed( feed || new Feed() );
		this.items = [];
	}

	Queue.prototype = {};

	Queue.prototype.init = function() {
		this.more();
	};

	Queue.prototype.push = function(item) {
		this.items.push(item);
	};

	Queue.prototype.pop = function() {
		return this.items.pop();
	};

	Queue.prototype.next = function() {
		return this.items.shift();
	};

	Queue.prototype.at = function(pos) {
		if( pos < 0 || pos >= this.items.length ) throw new Error('Invalid parameter passed to Queue.at');
		return this.items.splice(pos, 1)[0];
	};

	Queue.prototype.searchAndRetrieve = function(searchFn) {
		for( var i = 0, len = this.items.length; i < len; i++ ) {
			if( searchFn(this.items[i]) ) {
				return this.at(i);
			}
		}
		// TODO - if it didn't find, query Feed for more items. needs to accept callback for async
		throw new Error('Queue couldn\'t find item');
	};

	Queue.prototype.registerFeed = function(feed) {
		this.feed = feed;
		this.more = function() {
			var more = this.feed.release();
			this.items = this.items.concat(more);
		};
	}


	return Queue;

});