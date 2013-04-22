(function() {
	/*global define, require, describe, it, expect, dump, socket, io*/
	"use strict";

	define([
		'web/public/js/core/connection',
		'http://localhost:5000/socket.io/socket.io.js'
	], function(Connection, socket) {

		describe('Connection', function() {

			it('is defined', function() {
				expect(Connection).to.be.ok();
			});

			it('can be instantiated with a socket.io global object', function(done) {
				var c = new Connection(io);
				c.init();
				c.socket.on('connect', function() {
					expect(c.socket).to.be.ok();
					done();
				});

			});

			it('can register events upon instantiation and request links', function(done) {
				function handleLinks(response) {
					expect(response).to.be.ok();
					done();
				}

				var c = new Connection(io, {
					'links': handleLinks
				});
				c.init();
				c.request('links');
			});

		});

	});
}());