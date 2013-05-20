(function () {
	/*global define, require*/
	"use strict";

	define([
		'App'
		, './chatMessageCollection'
	], function(App, ChatMessageCollection) {

		App.set('user', {name: 'TestUser'});

		describe('chatMessageCollection', function() {

			it('is defined', function() {
				expect(ChatMessageCollection).to.be.ok();
			});

			it('can be instantiated', function() {
				var chat = new ChatMessageCollection(App);
				expect(chat).to.be.ok();
			});

			it('holds a socket property', function() {
				var chat = new ChatMessageCollection(App);
				expect(chat.socket).to.be.ok();
			});

		})

	});

}());