(function () {
	/*global define*/
	"use strict";

	define(['backbone'], function(Backbone) {

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