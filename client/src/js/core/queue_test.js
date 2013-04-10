(function() {
	/*global define, describe, it, expect, require, io*/
	"use strict";

	define(['client/src/js/core/queue', 'client/src/js/core/feed', 'client/src/js/app', 'backbone'], function(Queue, Feed, App, Backbone) {

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

			it('holds a Backbone.Collection to store items', function() {
				var q = new Queue();
				expect(q.items).to.be.a(Backbone.Collection);
			});

			it('can push new items', function() {
				var q = new Queue();
				var prevLength = q.items.length;
				q.push(testItem);
				expect(q.items.length).to.be.greaterThan(prevLength);
			});

			it('can shift the next item', function() {
				var q = new Queue();
				q.push(testItem);
				var prevLength = q.items.length;
				var item = q.next();
				expect(item.toJSON()).to.eql(testItem);
				expect(q.items.length).to.be.lessThan(prevLength);
			});

			it('can return items at position', function() {
				var q = new Queue();
				q.push(testItem);
				q.push(anotherTestItem);
				q.push(yetAnotherTestItem);
				expect(q.items.length).to.equal(3);
				var item = q.at(1);
				expect(item.toJSON()).to.eql(anotherTestItem);
				expect(q.items.length).to.equal(2);
			});

			it('can register a feed', function() {
				var q = new Queue();
				q.init();
				expect(q.feed).to.be.a(Feed);
			});

			it('accepts a feed as constructor parameter', function() {
				var f = new Feed();
				var q = new Queue(f);
				q.init();
				expect(q.feed).to.equal(f);
			});

			it('can configure its feed to listen to events', function(done) {
				function handleLinks(links) {
					expect(links).to.be.ok();
					done();
				}
				var f = new Feed(io);
				f.init();
				var q = new Queue(f);
				q.init();
				q.bindFeedTo('links', handleLinks);
				q.request('links');
			});

			it('can use its feed to fetch more items', function(done) {
				function handleLinks(links) {
					q.items.add(links);
					expect(q.items.length).to.be.greaterThan(0);
					done();
				}
				var f = new Feed(io);
				f.init();
				var q = new Queue(f);
				q.init();
				expect(q.items.length).to.be(0);
				q.bindFeedTo('links', handleLinks);
				q.request('links');
			});

			// TODO - refactor / rename push to add
			it('throws queue:add event when items are added', function(done) {
				App.on('queue:add', function() {
					expect(q.items.length).to.be(1);
					done();
				});
				var q = new Queue();
				q.init();
				q.add({a:1});
			});

		});
	});

}());