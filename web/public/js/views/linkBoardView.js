(function () {
	/*global define, console*/
	"use strict";

	define([
		'backbone'
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