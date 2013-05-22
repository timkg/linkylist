(function () {
	/*global define*/
	"use strict";

	define(['backbone'], function(Backbone) {

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