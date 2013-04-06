define(['client/src/ui/tree/node'], function(Node) {

	var parent = {
		nodes: [],
		depth: 0
	};

	describe('Node', function() {

		it('is defined', function() {
			var n = new Node(0, parent);
			expect(n).to.be.ok();
		});

		it('can split itself', function() {
			var n = new Node(0, parent);
			dump(n);
			n.split(parent);
			dump(n);
		});

	});

});