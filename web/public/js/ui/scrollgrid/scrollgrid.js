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

		ScrollGrid.prototype.fillVisibleArea = function() {

		};

		ScrollGrid.prototype.onWindowResize = function() {

		};

		ScrollGrid.prototype.onScroll = function() {

		};

		ScrollGrid.prototype.getLastChild = function() {

		};

		ScrollGrid.prototype.initItem = function() {
			var item = this.itemProvider.next();

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