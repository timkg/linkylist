
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
	define('lib/socketModel',[
		backbone
	], function(Backbone) {

		var SocketModel = Backbone.Model.extend({

			initSocketListeners: function() {
				if (!this.socketEvents) { return; }
				var self = this;
				_.each(this.socketEvents, function(fnName, key, obj) {
					if (typeof self[fnName] !== 'function') { throw new TypeError('socketEvents needs to hold list of strings of function names'); }
					self.socket.on(key, _.bind(self[fnName], self));
				});
			}

		});

		return SocketModel;

	});


}());
(function() {
	/*global define, console*/
	

	define('models/linkModel',[
		'lib/socketModel'
	], function(SocketModel) {

		var LinkModel = SocketModel.extend({

			validate: function(attrs) {
				if (!attrs.url) { throw new TypeError('LinkModel requires url attribute'); }
			}
			, socketEvents: {

			}
			, initialize: function(attrs, app) {
				var _ = app.get('_');
				this.set(attrs, {validate: true});
				this.socket = app.get('socket');
				this.app = app;
				this.socketEvents['link/' + this.get('url')] = 'onGet';
				this.initSocketListeners();
				this.socket.emit('link/get', {url: this.get('url')});
				this.socket.on('link/'+this.get('_id')+'/update', _.bind(this.onUpdate.bind, this));
			}
			, onGet: function(model) {
				console.log('onGet', model);
				this.set(model);
			}
			, onUpdate: function(attrs) {
				console.log('onUpdate', attrs);
				this.set(attrs);
			}

		});

		return LinkModel;
	});

} ());
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
	/*global define, console*/
	

	define('collections/linkBoardCollection',[
		'lib/socketCollection'
	], function(SocketCollection) {

		var LinkboardCollection = SocketCollection.extend({

			socketEvents: {

			}
			, initialize: function(models, app, ui, id) {
				this.app = app;
				this.ui = ui;
				this.id = id;
				this.socket = app.get('socket');
				this.socketEvents['board/' + this.id] = 'onBoardEvents';
				this.initSocketListeners();
			}
			, onBoardEvents: function(param) {
				if (param.error) { console.log('boardEvents error', param.error); }
				if ( 'board/add/link' in param ) {
					this.onLinkAdded(param['board/add/link']);
				}

			}
			, onLinkAdded: function(res) {
				var model = this.findWhere({url: res.url});
				model.set({preview: res.preview});
			}

		});

		return LinkboardCollection;

	});

}());
(function () {
	/*global define, console*/
	

	var backbone = 'backbone'; // prevent r.js from including backbone
	define('views/linkBoardView',[
		backbone
	], function(Backbone) {

		var LinkBoardView = Backbone.View.extend({

			tagName: 'article'

			, className: 'link-item'

			, initialize: function() {
				var self = this;
				this.app = this.options.app;
				this.ui = this.options.ui;
				this.template = this.ui.templates.link.linkBoardItem;
				this.model.on('change', function() {
					self.render();
				});
			}
			, render: function() {
				var html = this.template({link: this.model.toJSON()});
				this.$el.html(html);
				return this.$el;
			}

		});

		return LinkBoardView;

	});

}());
(function () {
	/*global define, $*/
	

	var backbone = 'backbone'; // prevent r.js from including backbone
	define('lib/collectionView',[backbone], function(Backbone) {

		var CollectionView = Backbone.View.extend({

			parseModels: function() {
				if (!this.itemSelector) { return false; }
				var $childElements, children = [];
				$childElements = this.ui.$(this.itemSelector);
				$childElements.each(function(index, elm) {
					var id, json;
					id = $(elm).attr('id');
					json = $(elm).data('json');
					if (json) {
						children.push(json);
					} else {
						children.push({id: id});
					}

				});

				return children;
			}
		});

		return CollectionView;

	});

}());
(function () {
	/*global define*/
	

	define('views/linkBoardCollectionView',[
		'lib/collectionView'
	], function(CollectionView) {

		var LinkBoardCollectionView = CollectionView.extend({

			initialize: function() {
				var self = this;
				this.app = this.options.app;
				this.ui = this.options.ui;
				this.collection = this.options.collection;
				this.itemView = this.options.itemView;
				this.itemSelector = this.options.itemSelector;
				this.collection.on('add', function(model, collection, event) {
					self.onLinkAdd(model);
				});
			}
			, onLinkAdd: function(model) {
				var view = new this.itemView({
					model: model
					, app: this.app
					, ui: this.ui
				});
				var rendered = view.render();
				this.$el.prepend(rendered);
			}

		});

		return LinkBoardCollectionView;

	});

}());
(function () {
	/*global define, $, console*/
	

	define('modules/board',[
		'lib/module'
		, 'models/linkModel'
		, 'collections/linkBoardCollection'
		, 'views/linkBoardView'
		, 'views/linkBoardCollectionView'
	], function(Module, LinkModel, LinkBoardCollection, LinkBoardView, LinkBoardCollectionView) {

		var Board = new Module('board', {
			init: function(app, ui) {
				var $moduleContainer, $itemContainer, boardId;
				$moduleContainer = ui.$('[data-module="board"]');
				boardId = $moduleContainer.attr('id');
				$itemContainer = $moduleContainer.find('.row.board');


				this.app = app;
				this.socket = app.get('socket');
				this.ui = ui;
				this.id = boardId;

				this.collection = new LinkBoardCollection([], app, ui, boardId);
				this.collectionView = new LinkBoardCollectionView({
					el: $itemContainer[0]
					, collection: this.collection
					, app: app
					, ui: ui
					, itemView: LinkBoardView
					, itemSelector: 'article.link-item'
				});
				this.parseModelsInDom();
				this.initControls();

				window.board = this;
			}
			, initControls: function() {
				var self = this;
				$('[data-module="board"]').find('form.addLinkToBoard').on('submit', function(event) {
					event.preventDefault();
					var $input = $(event.currentTarget).find('input[name="url"]');
					var url = $input.val();
					$input.val('');
					if (self.app.isUrl(url)) {
						self.onLinkAdd(url);
					}
				});
			}
			, parseModelsInDom: function() {
				var models = this.collectionView.parseModels();
				this.collection.add(models, {silent: true});
			}
			, onLinkAdd: function(url) {
				// check if link is duplicate
				if (this.collection.findWhere({url: url})) {
					console.log('already in collection');
					return;
				}
				// findOrCreate link with url, add it to board with id
				this.socket.emit('board/add/link', {_id: this.id, url: url});
				// create new BB LinkModel
				var link = new LinkModel({url: url}, this.app);
				// add new model to collection
				this.collection.add(link);
				// note: view creation is managed by this.boardView's 'add' event listener
			}
		});

		return Board;

	});

}());