define(['client/src/ui/grid/square', 'client/src/ui/itemProvider'], function(Square, ItemProvider){

	function Grid(w, h, squareInitFn) {
		this.itemProvider = new ItemProvider();
		this.w = w;
		this.h = h;
		this.rows = [];
		for( var row = 0; row < h; row++ ) {
			this.rows[row] = [];
			for( var col = 0; col < w; col++ ) {
				this.rows[row][col] = new Square(col, row, this);
				if( squareInitFn ) squareInitFn(this.rows[row][col]);

			}
		}
	}

	Grid.prototype = {};

	Grid.prototype.at = function(x, y) {
		if( x < 0 || x >= this.w || y < 0 || y >= this.h ) throw ('Grid.at(x, y) received out of bounds coordinates');
		return this.rows[x][y];
	};

	Grid.prototype.provideItem = function() {
		return this.itemProvider.next();
	};

	Grid.prototype.all = function(fn) {
		var args = args || [];
		for( var row = 0; row < this.h; row++ ) {
			for( var col = 0; col < this.w; col++ ) {
				fn(this.rows[row][col]);
			}
		}

	};


	return Grid;

});