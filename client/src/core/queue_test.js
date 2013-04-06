define(['client/src/core/queue', 'client/src/core/feed'], function(Queue, Feed) {

	var testItem = {
		"provider_url": "http://www.codecademy.com",
		"description": "Codecademy is the easiest way to learn how to code. It's interactive, fun, and you can do it with your friends."
	};

	var anotherTestItem = {
		"provider_url": "http://www.codecademy.com",
		"description": "Another Codecademy is the easiest way to learn how to code. It's interactive, fun, and you can do it with your friends."
	};

	var yetAnotherTestItem = {
		"provider_url": "http://www.codecademy.com",
		"description": "Another Codecademy is the easiest way to learn how to code. It's interactive, fun, and you can do it with your friends."
	};

	describe('Queue', function() {

		it('is defined', function(){
			var q = new Queue();
			expect(q).to.be.ok();
		});

		it('can push new items', function() {
			var q = new Queue();
			var prevLength = q.items.length;
			q.push(testItem);
			expect(q.items.length).to.be.greaterThan(prevLength);
		});

		it('can pop items', function() {
			var q = new Queue();
			q.push(testItem);
			var prevLength = q.items.length;
			var item = q.pop();
			expect(item).to.equal(testItem);
			expect(q.items.length).to.be.lessThan(prevLength);
		});

		it('can return items at position', function() {
			var q = new Queue();
			q.items = []; // override queue initialization for testing
			q.push(testItem);
			q.push(anotherTestItem);
			q.push(yetAnotherTestItem);
			expect(q.items.length).to.equal(3);
			var item = q.at(1);
			expect(item).to.equal(anotherTestItem);
			expect(q.items.length).to.equal(2);
		});

		it('can register a feed', function() {
			var q = new Queue();
			var Feed = require('client/src/core/feed');
			var f = new Feed();
			q.registerFeed(f);
			expect(q.feed).to.be(f);
		});

		it('creates a feed if none is given', function() {
			var q = new Queue();
			expect(q.feed).to.be.a(Feed);
		});

		it('accepts a feed as constructor parameter', function() {
			var f = new Feed();
			var q = new Queue(f);
			expect(q.feed).to.be(f);
		});

		it('can use its feed to fetch more items', function() {
			var q = new Queue();
			var prevLength = q.items.length;
			q.more();
			expect(q.items.length).to.be.greaterThan(prevLength);
		});

	});

});