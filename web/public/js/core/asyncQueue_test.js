(function() {
	/*global define, describe, it, expect, require, io*/
	"use strict";

	define([
		'http://localhost:5000/socket.io/socket.io.js',
		'web/public/js/core/asyncQueue',
		'web/public/js/app',
		'backbone'
	], function(io, Queue, App, Backbone) {

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

			it('can be instantiated with a socket.io global object', function(done) {
				var q = new Queue();
				q.init();
				q.socket.on('connect', function() {
					expect(q.socket).to.be.ok();
					done();
				});

			});

			it('can register events', function(done) {
				function handleLinks(response) {
					expect(response).to.be.ok();
					done();
				}

				var q = new Queue();
				q.init();
				q.listenTo('links', handleLinks)
				q.request('links');
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

			it('throws queue:add event when items are added', function(done) {
				App.events.on('queue:add', function() {
					expect(q.items.length).to.be(1);
					done();
				});
				var q = new Queue();
				q.init();
				q.add({a:1});
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

		});
	});

}());