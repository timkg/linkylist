define(['client/src/ui/grid/grid', 'client/src/ui/grid/square'], function(Grid, Square){

	describe('Grid', function() {

		it('is defined', function() {
			var g = new Grid();
			expect(g).to.be.ok();
		});

		it('creates Squares upon initialization', function() {
			var g = new Grid(2, 2);
			var s = g.at(0, 0);
			expect(s).to.be.a(Square);
			expect(s.x).to.be(0);
			expect(s.y).to.be(0);
		});

		it('permits access to squares via at(x, y)', function() {
			var g = new Grid(2, 2);
			var s1 = g.at(0, 0);
			var s2 = g.at(0, 1);
			var s3 = g.at(1, 0);
			var s4 = g.at(1, 1);
			expect(s1).to.be.a(Square);
			expect(s2).to.be.a(Square);
			expect(s3).to.be.a(Square);
			expect(s4).to.be.a(Square);
		});

		it('throws exception when trying to get sqaure out of bounds', function() {
			var g = new Grid(2, 2);
			expect(function() {
				var s = g.at(0, 3);
			}).to.throwError();
		});

		it('can provide an init function for squares', function() {

			var g = new Grid(1, 1, function(square) {
				square.requestItem();
			});

//			dump(g.at(0,0));
//			expect(g.at(0,0).item).to.be.ok();


		});

	});

});