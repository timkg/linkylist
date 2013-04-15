(function() {
	/*global define, console*/
	"use strict";

	define(['../itemProvider', './square'], function(ItemProvider, Square){

		function ScrollGrid(queue) {
			this.queue = queue;
			this.items = new Backbone.Collection();
		}

		ScrollGrid.prototype = {};

		ScrollGrid.prototype.init = function(container) {
			this.itemProvider = new ItemProvider(this.queue);
			this.container = container;
		};

		ScrollGrid.prototype.fillVisibleArea = function() {
			var count = 15,
				df = document.createDocumentFragment();
			while(count > 0) {
				var s = new Square(this.getItem());
				df.appendChild(s.render());
				count -= 1;
			}
			this.container.appendChild(df);
		};

		ScrollGrid.prototype.onWindowResize = function() {

		};

		ScrollGrid.prototype.onScroll = function() {

		};

		ScrollGrid.prototype.getLastChild = function() {

		};

		ScrollGrid.prototype.getItem = function() {
			var item = this.itemProvider.next();
			this.items.add(item);
			return item;
		};



		// init display area

		// listen to scroll

		// fill visible area

		// react to scroll

		// react to resize

		return ScrollGrid;

	});
}());