define(['client/src/core/feed'], function(Feed) {

	function Queue() {
		this.items = [];
	}

	Queue.prototype = {};

	Queue.prototype.push = function(item) {
		this.items.push(item);
	};

	Queue.prototype.pop = function() {
		return item = this.items.pop();
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
		// TODO - if it didn't find, query Feed for more items
		throw new Error('Queue couldn\'t find item');

	};

	Queue.prototype.registerFeed = function(feed) {
		this.feed = feed;
	}

	Queue.prototype.more = function() {
		var more = this.feed.fetch();
		this.items = this.items.concat(more);
	};

	return Queue;

});