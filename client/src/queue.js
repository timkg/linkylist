define(['./feed'], function(Feed) {

	function Queue() {
		this.feed = new Feed();	
	}

	Queue.prototype = {};

	Queue.prototype.getItem = function() {
		return this.feed.pop();
	};

	return Queue;

});