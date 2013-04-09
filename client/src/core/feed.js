define([], function() {

	function Feed(opts) {
		var options = opts || {};
		this.items = [];
		this.endpoint = opts.endpoint || 'http://localhost:5000/fetch';
		var socket = io.connect(this.endpoint);
		socket.on('response', function (data) {
			console.log(data);
			socket.emit('my other event', { my: 'data' });
		});
	}

	Feed.prototype = new Backbone.EventEmitter();

	Feed.prototype.init = function() {

	};

	Feed.prototype.fetch = function() {
		socket.emit('request');
	};

	Feed.prototype.release = function() {
		if( this.items.length === 0 ) this.fetch();
		return this.items.splice(0);
	};

	return Feed;

});