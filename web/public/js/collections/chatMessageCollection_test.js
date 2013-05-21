(function () {
	/*global define, require, describe, it, expect, runs, waitsFor*/
	"use strict";

	define([
		'App'
		, './chatMessageCollection'
	], function(App, ChatMessageCollection) {

		// TODO - think about how to mock App, especially socket.io
		App.set('user', {name: 'TestUser'});

		describe('chatMessageCollection', function() {

			it('is defined', function() {
				expect(ChatMessageCollection).toBeTruthy();
			});

			it('can be instantiated', function() {
				var chat = new ChatMessageCollection([], App.get('socket'), App.get('user'));
				expect(chat).toBeTruthy();
			});

			it('holds a socket property', function() {
				var chat = new ChatMessageCollection([], App.get('socket'), App.get('user'));
				expect(chat.socket).toBeTruthy();
			});

			it('reacts to text events', function() {
				var chat = new ChatMessageCollection([], App.get('socket'), App.get('user'));
				var chat2 = new ChatMessageCollection([], App.get('io').connect('http://localhost:5000'), {name: 'TestUser2'});

				runs(function() {
					chat2.socket.emit('text', 'some message here');
				});

				waitsFor(function() {
					return chat.models.length === 1;
				}, 'received text event', 1500);

			});

		});

	});

}());