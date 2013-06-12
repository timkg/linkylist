
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
	

	define('collections/latestBoardCollection',[
		'lib/socketCollection'
	], function(SocketCollection) {

		var LatestBoardCollection = SocketCollection.extend({
			initialize: function(models, socket) {
				this.socket = socket;
				this.initSocketListeners();
			}
			, socketEvents: {
				'board/add': 'onBoardAdded'
			}
			, onBoardAdded: function(board) {
				this.add(board);
			}

		});

		return LatestBoardCollection;

	});

}());
(function () {
	/*global define*/
	

	var backbone = 'backbone'; // prevent r.js from including backbone
	define('views/latestBoardView',[backbone], function(Backbone) {

		var LatestBoardView = Backbone.View.extend({

			tagName: 'li'

			, className: 'board-item'

			, initialize: function() {
				this.app = this.options.app;
				this.ui = this.options.ui;
			}
			, render: function() {
				var rendered = this.ui.templates.board.boardListItem({board: this.model.toJSON()});
				this.$el.append(rendered);
				return this.el;
			}
		});

		return LatestBoardView;

	});

}());
(function () {
	/*global define*/
	

	var backbone = 'backbone'; // prevent r.js from including backbone
	define('views/latestBoardCollectionView',[backbone], function(Backbone) {

		var LatestBoardCollectionView = Backbone.View.extend({

			el: '[data-module="latest-boards"]'

			, events: {
				'click .newItems': 'onInsertBoards'
			}

			// TODO - make automatic sync/insertion optional (switch)

			, initialize: function(app, ui, collection, itemView) {
				this.app = app;
				this.ui = ui;
				this.collection = collection;
				this.itemView = itemView;
				this.newItems = [];
				this._ = this.app.get('_');
				this.initListeners();
				window.latestBoards = this;
			}
			, initListeners: function() {
				this.collection.on('add', this._.bind(this.onBoardAdded, this));
			}
			, onBoardAdded: function(board, collection, event) {
				this.bufferNewBoardView(board);
				this.updateNewBoardCounter();
			}

			, bufferNewBoardView: function(board) {
				var view = new this.itemView({
					model: board
					, app: this.app
					, ui: this.ui
				});
				this.newItems.push(view.render());
			}

			, updateNewBoardCounter: function() {
				var prevCount, $elm, $numberElm;
				$elm = this.$el.find('.newItems');
				$numberElm = $elm.find('span');
				prevCount = parseInt($numberElm.text(), 10);
				prevCount += 1;
				$numberElm.text(prevCount);
				$elm.removeClass('hide');
			}

			, resetNewBoardCounter: function() {
				var $elm = this.$el.find('.newItems');
				$elm.find('span').text(0);
				$elm.addClass('hide');
			}

			, onInsertBoards: function() {
				this.ui.$(this.newItems)
					.prependTo('.latest-boards')
					.css({opacity: 0})
					.fadeTo(250, 1);
				this.newItems = [];
				this.resetNewBoardCounter();
			}

		});

		return LatestBoardCollectionView;

	});

}());
(function () {
	/*global define*/
	

	define('modules/latest-boards',[
		'lib/module'
		,'collections/latestBoardCollection'
		, 'views/latestBoardView'
		, 'views/latestBoardCollectionView'
	], function(Module, LatestBoardCollection, LatestBoardView, LatestBoardCollectionView) {

		var LatestBoards = new Module('latest-boards', {
			init: function(app, ui) {
				this.boards = new LatestBoardCollection([], app.get('socket'));
				this.boardCollectionView = new LatestBoardCollectionView(app, ui, this.boards, LatestBoardView);
			}
		});

		return LatestBoards;

	});

}());