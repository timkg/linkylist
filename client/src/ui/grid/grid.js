define(['client/src/ui/grid/square'], function(Square){

	function Grid(w, h) {
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

	return Grid;

});