(function() {
	/*global define, require, describe, it, expect*/
	"use strict";

	define([
		'web/public/js/ui/scrollgrid/square'
	], function(Square, Queue) {

		describe('Scrollgrid Square', function() {

			var mockQueue = {
				promiseItem: function() {
					return {};
				}
			};

			it('is defined', function() {
				expect(Square).to.be.ok();
			});

			it('can be instantiated', function() {
				var s = new Square(mockQueue);
				expect(s).to.be.a(Square);
			});

			it('initializes with a state of "requeststarted"', function() {
				var s = new Square(mockQueue);
				expect(s.current).to.equal('requeststarted');
			});

			it('transitions to state "ready" when "receive()" is called', function() {
				var s = new Square(mockQueue);
				s.receive();
				expect(s.current).to.equal('ready');
			});

			it('transitions to state "error" when "fail()" is called', function() {
				var s = new Square(mockQueue);
				s.fail();
				expect(s.current).to.equal('error');
			});

		});

	});
}());