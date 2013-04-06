define(['client/src/ui/grid/grid', 'client/src/ui/grid/square'], function(Grid, Square) {

	describe('Square', function() {

		var grid = new Grid(3, 3);

		it('is defined', function() {
			var s = new Square(0, 0, {});
			expect(s).to.be.ok();
		});

		it('finds neighbour via top', function() {
			var s = grid.at(1, 1);
			expect(s).to.be.a(Square);
			var n = s.top();
			expect(n).to.be.a(Square);
			expect(n.x).to.be(1);
			expect(n.y).to.be(0);
		});

		it('finds neighbour via topRight', function() {
			var s = grid.at(1, 1);
			expect(s).to.be.a(Square);
			var n = s.topRight();
			expect(n).to.be.a(Square);
			expect(n.x).to.be(2);
			expect(n.y).to.be(0);
		});

		it('finds neighbour via right', function() {
			var s = grid.at(1, 1);
			expect(s).to.be.a(Square);
			var n = s.right();
			expect(n).to.be.a(Square);
			expect(n.x).to.be(2);
			expect(n.y).to.be(1);
		});

		it('finds neighbour via bottomRight', function() {
			var s = grid.at(1, 1);
			expect(s).to.be.a(Square);
			var n = s.bottomRight();
			expect(n).to.be.a(Square);
			expect(n.x).to.be(2);
			expect(n.y).to.be(2);
		});

		it('finds neighbour via bottom', function() {
			var s = grid.at(1, 1);
			expect(s).to.be.a(Square);
			var n = s.bottom();
			expect(n).to.be.a(Square);
			expect(n.x).to.be(1);
			expect(n.y).to.be(2);
		});

		it('finds neighbour via bottomLeft', function() {
			var s = grid.at(1, 1);
			expect(s).to.be.a(Square);
			var n = s.bottomLeft();
			expect(n).to.be.a(Square);
			expect(n.x).to.be(0);
			expect(n.y).to.be(2);
		});

		it('finds neighbour via left', function() {
			var s = grid.at(1, 1);
			expect(s).to.be.a(Square);
			var n = s.left();
			expect(n).to.be.a(Square);
			expect(n.x).to.be(0);
			expect(n.y).to.be(1);
		});

		it('finds neighbour via topLeft', function() {
			var s = grid.at(1, 1);
			expect(s).to.be.a(Square);
			var n = s.topLeft();
			expect(n).to.be.a(Square);
			expect(n.x).to.be(0);
			expect(n.y).to.be(0);
		});

		it('returns null when no neighbour at specified direction', function() {
			var s = grid.at(0, 0);
			expect(s).to.be.a(Square);
			var n = s.topLeft();
			expect(n).to.be(null);
			// TODO - test for null for all directions
		});

	});

});