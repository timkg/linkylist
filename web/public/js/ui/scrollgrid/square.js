(function() {
	/*global define, require*/
	"use strict";

	define([
		'jquery',
		'statemachine',
		'../../vendors/moustache',
		'text!../../../html/templates/square.html',
		'App'
	], function($, StateMachine, Moustache, templateString, App){

		function Square(queue, formatter) {
			// TODO - better use "queue" dependency injection or request event?
			this.queue = queue;
			this.formatter = formatter;
			this.kickoff();
		}

		Square.prototype = {};

		StateMachine.create({
			target: Square.prototype,
			events: [
				{ name: 'kickoff', from: 'none', to: 'RequestStarted' },
				{ name: 'received', from: 'RequestStarted', to: 'ReceivedItemFromQueue' },
				{ name: 'fail', from: 'RequestStarted', to: 'Error' }
		]});

		Square.prototype.onRequestStarted = function() {
			this.queue.next()
				.then(function(item) {
					this.item = item.valueOf();
					this.received();
				}.bind(this),
				function(reason) {
					this.fail(reason);
				}.bind(this));
		};

		Square.prototype.onReceivedItemFromQueue = function() {
			this.formatter.format(this.item);
			var json = this.item.toJSON();
			json.image = (json.image ? json.image : {});
			var $rendered = $(Moustache.render(templateString, json));
			$($rendered)
				.find('.' + json.image.type + '-container')
					.css({'background': "url('"+json.image.url+"') no-repeat center center"}) // single quotes around url: https://code.google.com/p/slimbox/issues/detail?id=25
				.end()
				.appendTo('.hiddenitemholder');
			App.events.trigger('itemReady', this.item);
		};

		Square.prototype.onError = function(reason) {
			throw new Error(reason);
		};

		// TODO - clean me up
		Square.prototype.render = function() {
			this.elm = document.createElement('div');
			this.elm.setAttribute('class', 'item');

			return this.elm;
		};

		return Square;
	});
}());