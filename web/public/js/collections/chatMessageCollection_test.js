(function () {
	/*global define, require*/
	"use strict";

	define(['./chatMessageCollection'], function(ChatMessageCollection) {

		describe('chatMessageCollection', function() {

			it('is defined', function() {
				expect(ChatMessageCollection).to.be.ok();
			});

			it('can be instantiated', function() {
				var chat = new ChatMessageCollection();
				expect(chat).to.be.ok();
			});

			it('holds a socket property', function() {
				var chat = new ChatMessageCollection();
				expect(chat.socket).to.be.ok();
			});

		})

	});

}());