define(['client/src/ui/grid/square', 'client/src/ui/itemProvider'], function(Square, ItemProvider){

	function Grid(w, h) {
		this.itemProvider = new ItemProvider();
		this.w = w;
		this.h = h;
		this.rows = [];
		for( var row = 0; row < w; row++ ) {
			this.rows[row] = [];
			for( var col = 0; col < h; col++ ) {
				this.rows[row][col] = new Square(row, col, this);
			}
		}
	}

	Grid.prototype = {};

	Grid.prototype.at = function(x, y) {
		if( x < 0 || x >= this.w || y < 0 || y >= this.h ) throw ('Grid.at(x, y) received out of bounds coordinates');
		return this.rows[x][y];
	};

	Grid.prototype.provideItem = function(square) {

	};

	return Grid;

});