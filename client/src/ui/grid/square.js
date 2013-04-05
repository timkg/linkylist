define([], function(){

	function Square(x, y, grid) {
		this.x = x;
		this.y = y;
		this.grid = grid;
	}

	Square.prototype = {};

	Square.prototype.canAccomodate = function(item) {
		// create array with direction names
		// iterate over this[array[d]]();
	};

	Square.topLeft = function() {
		try {
			var s = this.grid.get(this.x - 1, this.y - 1);
		} catch(e) {
			console.log(e);
		}
	};
	Square.top = function() {
		try {
			var s = this.grid.get(this.x, this.y - 1);
		} catch(e) {
			console.log(e);
		}
	};
	Square.topRight = function() {
		try {
			var s = this.grid.get(this.x + 1, this.y - 1);
		} catch(e) {
			console.log(e);
		}
	};
	Square.right = function() {
		try {
			var s = this.grid.get(this.x + 1, this.y);
		} catch(e) {
			console.log(e);
		}
	};
	Square.bottomRight = function() {
		try {
			var s = this.grid.get(this.x + 1, this.y + 1);
		} catch(e) {
			console.log(e);
		}
	};
	Square.bottom = function() {
		try {
			var s = this.grid.get(this.x, this.y + 1);
		} catch(e) {
			console.log(e);
		}
	};
	Square.bottomLeft = function() {
		try {
			var s = this.grid.get(this.x - 1, this.y + 1);
		} catch(e) {
			console.log(e);
		}
	};
	Square.left = function() {
		try {
			var s = this.grid.get(this.x - 1, this.y);
		} catch(e) {
			console.log(e);
		}
	};


	return Square;
});