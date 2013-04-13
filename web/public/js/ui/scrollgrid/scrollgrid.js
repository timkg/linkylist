(function() {
	/*global define, console*/
	"use strict";

	define(['../itemProvider'], function(ItemProvider){

		function ScrollGrid(queue) {
			this.queue = queue;
		}

		ScrollGrid.prototype = {};

		ScrollGrid.prototype.init = function() {
			this.itemProvider = new ItemProvider(this.queue);
		};

		ScrollGrid.prototype.initItem = function() {
			var item = this.itemProvider.next();
			console.log(this.itemProvider.getItemContent(item.toJSON()));
		};



		// init display area

		// listen to scroll

		// fill visible area

		// react to scroll

		// react to resize

		return ScrollGrid;

	});
}());