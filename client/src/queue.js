define(['feed'], function(Feed) {

	function Queue() {
		this.feed = new Feed();
	}

	Queue.prototype = {};

	Queue.prototype.getItem = function(callback) {
		var item = this.feed.pop();
		callback(item);
	};

	Queue.prototype.formatter = function() {
		// define min size for images
		// determine if item has inline or block image
		// choose item view
	};

	return Queue;

});