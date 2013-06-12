
	define('lib/module',[], function() {

		function Module(name, hash) {
			if (!name) { throw new TypeError('Module definition requires a name'); }
			this.name = name;
			for(var key in hash) {
				if (hash.hasOwnProperty(key)) {
					this[key] = hash[key];
				}
			}
		}

		return Module;

	});

(function () {
	/*global define, _*/
	

	var backbone = 'backbone'; // prevent r.js from including backbone
	define('lib/socketCollection',[backbone], function(Backbone) {

		var SocketCollection = Backbone.Collection.extend({

			initSocketListeners: function() {
				if (!this.socketEvents) { return; }
				var self = this;
				_.each(this.socketEvents, function(fnName, key, obj) {
					if (typeof self[fnName] !== 'function') { throw new TypeError('socketEvents needs to hold list of strings of function names'); }
					self.socket.on(key, _.bind(self[fnName], self));
				});
			}

		});

		return SocketCollection;

	});


}());
(function () {
	/*global define, _*/
	

	define('collections/latestLinkCollection',[
		'lib/socketCollection'
	], function(SocketCollection) {


		var LatestLinkCollection = SocketCollection.extend({
			initialize: function(models, socket) {
				this.socket = socket;
				this.initSocketListeners();
			}
			, socketEvents: {
				'link/add': 'onLinkAdded'
			}
			, initSocketListeners: function() {
				var self = this;
				_.each(this.socketEvents, function(fn, key, obj) {
					if (typeof self[fn] !== 'function') { throw new TypeError('socketEvents needs to hold list of functions'); }
					self.socket.on(key, _.bind(self[fn], self));
				});
			}
			, onLinkAdded: function(link) {
				this.add(link);
			}

		});

		return LatestLinkCollection;

	});

}());
(function () {
	/*global define*/
	

	define('modules/latest-links',[
		'lib/module'
		, 'collections/latestLinkCollection'
	], function(Module, LatestLinkCollection) {

		var LatestLinks = new Module('latest-links', {
			init: function(app, ui) {
				this.app = app;
				this.ui = ui;
				this.links = new LatestLinkCollection([], app.get('socket'));
			}
		});

		return LatestLinks;

	});

}());