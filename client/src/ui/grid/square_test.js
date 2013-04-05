define(['client/src/ui/grid/grid', 'client/src/ui/grid/square'], function(Grid, Square) {

	describe('Square', function() {

		it('is defined', function() {
			var s = new Square(0, 0, {});
			expect(s).to.be.ok();
		});

	});

});