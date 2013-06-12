(function () {
	/*global define, $*/
	"use strict";

	var backbone = 'backbone'; // prevent r.js from including backbone
	define([backbone], function(Backbone) {

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