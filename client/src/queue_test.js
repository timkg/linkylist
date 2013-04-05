define(['client/src/queue'], function(Queue) {

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
			q.push(testItem);
			expect(q.items.length).to.equal(1);
		});

		it('can pop items', function() {
			var q = new Queue();
			q.push(testItem);
			expect(q.items.length).to.equal(1);
			var item = q.pop();
			expect(item).to.equal(testItem);
			expect(q.items.length).to.equal(0);
		});

		it('can return items at position', function() {
			var q = new Queue();
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
			var Feed = require('client/src/feed');
			var f = new Feed();
			q.registerFeed(f);
			expect(q.feed).to.equal(f);
		});

		it('can use its feed to fetch more items', function() {
			var q = new Queue();
			var Feed = require('client/src/feed');
			q.registerFeed(new Feed());
			expect(q.items.length).to.equal(0);
			q.more();
			expect(q.items.length).to.be.greaterThan(0);
		});

	});

});