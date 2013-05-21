(function() {
	/*global define, describe, it, expect*/
	"use strict";

	define([
		'./linkStreamCollection'
	], function(LinkStreamCollection) {

		describe('LinkStreamCollection', function() {

			it('is defined', function() {
				expect(LinkStreamCollection).to.be.ok();
			});

			it('can be instantiated', function() {
				var l = new LinkStreamCollection();
			});

			it('calls its base URL for the first request', function(done) {
				var l = new LinkStreamCollection();
				l.nextPage({
					success: function(a, b, c, d) {
						// debugger
						done();
					},
					error: function(a, b, c, d) {
						// debugger
						done();
					}
				});
			});

			it('calls its next_page URL for subsequent requests', function(done) {
				var l = new LinkStreamCollection();
				l.currentPage = 1;
				l.next_page_param = '?page=2&max_id=329966243178225664&q=javascript';
				l.nextPage({
					success: function(a, b, c, d) {
//						debugger;
						done();
					},
					error: function(a, b, c, d) {
//						debugger;
						done();
					}
				});
			});

		});

	});
}());