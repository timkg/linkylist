(function() {
	/*global define, require, describe, it, expect, dump, socket*/
	"use strict";

	define(['client/src/js/core/feed', 'http://localhost:5000/socket.io/socket.io.js'], function(Feed, socket) {

		describe('Feed', function() {

			it('is defined', function() {
				expect(Feed).to.be.ok();
			});

			it('throws an error when instantiated without socket.io global object', function() {
				expect(function(){
					var f = new Feed();
					f.init();
				}).to.throwException();
			});

			it('can be instantiated with a socket.io global object', function(done) {
				var f = new Feed(io);
				f.init();
				f.socket.on('connect', function() {
					expect(f.socket).to.be.ok();
					done();
				});
				
			});

			it('can register events upon instantiation and request links', function(done) {
				var f = new Feed(io, {
					'links': handleLinks
				});
				f.init();
				f.request('links');

				function handleLinks(response) {
					expect(response).to.be.ok();
					done();
				}
			})
		});

	});
}());