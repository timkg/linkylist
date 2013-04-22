(function() {
	/*global define, describe, it, expect, require, io*/
	"use strict";

	define([
		'web/public/js/core/queue',
		'web/public/js/core/connection',
		'web/public/js/app',
		'backbone'
	], function(Queue, Connection, App, Backbone) {

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
				q.add(testItem);
				expect(q.items.length).to.be.greaterThan(prevLength);
			});

			it('returns a promise on next()', function(done) {
				var q = new Queue();
				q.add(testItem);
				var item = q.next()
					.then(function(item) {
						expect(item.toJSON()).to.eql(testItem);
						done();
					});
			});

			it('can create a new connection', function() {
				var q = new Queue();
				q.init();
				expect(q.connection).to.be.a(Connection);
			});

			it('accepts a feed as constructor parameter', function() {
				var f = new Connection();
				var q = new Queue(f);
				q.init();
				expect(q.connection).to.equal(f);
			});

			it('can configure its feed to listen to events', function(done) {
				function handleLinks(links) {
					expect(links).to.be.ok();
					done();
				}
				var f = new Connection(io);
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
				var f = new Connection(io);
				f.init();
				var q = new Queue(f);
				q.init();
				expect(q.items.length).to.be(0);
				q.bindFeedTo('links', handleLinks);
				q.request('links');
			});

			it('throws queue:add event when items are added', function(done) {
				App.events.on('queue:add', function() {
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