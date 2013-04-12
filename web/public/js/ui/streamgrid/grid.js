(function() {
	/*global define, console*/
	"use strict";

	define(['../itemProvider'], function(ItemProvider){

		function Grid(queue) {
			this.queue = queue;
		}

		Grid.prototype = {};

		Grid.prototype.init = function() {
			this.itemProvider = new ItemProvider(this.queue);
		};

		Grid.prototype.initItem = function() {
			var item = this.itemProvider.next();
			console.log(this.itemProvider.getItemContent(item.toJSON()));
		};

		return Grid;

	});
}());