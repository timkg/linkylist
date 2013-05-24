(function () {
	/*global define*/
	"use strict";

	define([
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