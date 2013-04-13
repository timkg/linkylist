(function() {
	/*global define, require*/
	"use strict";

	define([], function(){

		function Square(x, y, grid) {
			this.x = x;
			this.y = y;
			this.grid = grid;
		}

		Square.prototype = {};

		Square.prototype.print = function() {
			return {
				x: this.x,
				y: this.y,
				item: this.item
			};
		};

		Square.prototype.canAccomodate = function(item) {
			// create array with direction names
			// iterate over this[array[d]]();
		};

		Square.prototype.requestItem = function() {
			this.item = this.grid.provideItem();
		};

		/*
		Square.prototype.placeItem = function(item) {
			var itemToPlace = item || this.item;
			if( !itemToPlace ) {
				return false;
			}

			if( this.item.isHorizontal ) {
				//this.left() - do things
			}
			if( this.item.isVertical ) {
				//this.bottom() - do things
			}
			if( this.item.isSquare ) {
				// meh
			}
		};
		*/

		Square.prototype.hasItem = function() {
			return !!this.item;
		};

		Square.prototype.topLeft = function() {
			var s = null;
			try {
				s = this.grid.at(this.x - 1, this.y - 1);
			} catch(e) {
				// console.log(e);
			}
			return s;
		};

		Square.prototype.top = function() {
			var s = null;
			try {
				s = this.grid.at(this.x, this.y - 1);
				return s;
			} catch(e) {
				// console.log(e);
			}
			return s;
		};

		Square.prototype.topRight = function() {
			var s = null;
			try {
				s = this.grid.at(this.x + 1, this.y - 1);
			} catch(e) {
				// console.log(e);
			}
			return s;
		};

		Square.prototype.right = function() {
			var s = null;
			try {
				s = this.grid.at(this.x + 1, this.y);
			} catch(e) {
				// console.log(e);
			}
			return s;
		};

		Square.prototype.bottomRight = function() {
			var s = null;
			try {
				s = this.grid.at(this.x + 1, this.y + 1);
			} catch(e) {
				// console.log(e);
			}
			return s;
		};

		Square.prototype.bottom = function() {
			var s = null;
			try {
				s = this.grid.at(this.x, this.y + 1);
			} catch(e) {
				// console.log(e);
			}
			return s;
		};

		Square.prototype.bottomLeft = function() {
			var s = null;
			try {
				s = this.grid.at(this.x - 1, this.y + 1);
			} catch(e) {
				// console.log(e);
			}
			return s;
		};

		Square.prototype.left = function() {
			var s = null;
			try {
				s = this.grid.at(this.x - 1, this.y);
			} catch(e) {
				// console.log(e);
			}
			return s;
		};


		return Square;
	});
}());