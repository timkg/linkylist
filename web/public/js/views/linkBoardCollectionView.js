(function () {
	/*global define*/
	"use strict";

	define([
		'backbone'
	], function(Backbone) {

		var LinkBoardCollectionView = Backbone.View.extend({

			initialize: function() {
				var self = this;
				this.app = this.options.app;
				this.ui = this.options.ui;
				this.collection = this.options.collection;
				this.itemView = this.options.itemView;
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