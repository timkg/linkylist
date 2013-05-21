(function() {
	/*global define*/
	"use strict";

	define([
		'backbone'
	], function(Backbone) {

		var LinkModel = new Backbone.Model.extend({

//			initialize: function(options) {
//				if (!options.queue) {
//					throw new Error('LinkModel needs queue');
//				}
//
//				this.kickoff();
//			},
//
//			onRequestStarted: function() {
//				this.get('queue').next()
//					.then(function(item) {
//						this.set(item.valueOf());
//						this.received();
//					}.bind(this),
//					function(reason) {
//						this.fail(reason);
//					}.bind(this));
//			},
//
//			onReceivedItemFromQueue: function() {
//				this.formatter.format(this.item);
//				Backbone.events.trigger('itemReadyToPlaceOnRow', this.item);
//			},
//
//			onError: function(reason) {
//				throw new Error(reason);
//			}

		});

//		StateMachine.create({
//			target: LinkModel.prototype,
//			events: [
//				{ name: 'kickoff', from: 'none', to: 'RequestStarted' },
//				{ name: 'received', from: 'RequestStarted', to: 'ReceivedItemFromQueue' },
//				{ name: 'fail', from: 'RequestStarted', to: 'Error' }
//			]});

		return LinkModel;

	});

} ());