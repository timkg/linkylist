define(['client/src/ui/grid/grid', 'client/src/ui/grid/square'], function(Grid, Square){

	describe('Grid', function() {

		it('is defined', function() {
			var g = new Grid();
			expect(g).to.be.ok();
		});

	});

});