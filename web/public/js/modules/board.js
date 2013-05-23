(function () {
	/*global define*/
	"use strict";

	define([
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

				this.board = new LinkBoardCollection([], app, ui, boardId);
				this.boardView = new LinkBoardCollectionView({
					el: $itemContainer[0]
					, collection: this.board
					, app: app
					, ui: ui
					, itemView: LinkBoardView
				});
				this.initControls();
				// parse Models on page and add to collection
			}
			, initControls: function() {
				var self = this;
				this.ui.$('[data-module="board"]').find('form.addLinkToBoard').on('submit', function(event) {
					event.preventDefault();
					var $input = $(event.currentTarget).find('input[name="url"]');
					var url = $input.val();
					$input.val('');
					if (self.app.isUrl(url)) {
						self.onLinkAdd(url);
					}
				});
			}
			, onLinkAdd: function(url) {
				// check if link is duplicate
				// TODO - this obviously needs all models on page parsed into collection
				if (this.board.findWhere({url: url})) {
					console.log('already in collection');
					return;
				}
				// findOrCreate link with url, add it to board with id
				this.socket.emit('board/add/link', {_id: this.id, url: url});
				// create new BB LinkModel
				var link = new LinkModel({url: url}, this.app);
				// add new model to collection
				this.board.add(link);
				// note: view creation is managed by this.boardView's 'add' event listener
			}
		});

		return Board;

	});

}());