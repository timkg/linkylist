define(['client/src/core/feed'], function(Feed) {

	describe('Feed', function() {

		it('is defined', function() {
			var f = new Feed();
			expect(f).to.be.ok();
			dump(f.items.length);
		});

		it('can fetch more items', function() {
			var f = new Feed();
			var itemLength = f.items.length;
			f.fetch();
			expect(f.items.length).to.be.greaterThan(itemLength);
		});

	});

});