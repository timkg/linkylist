(function () {
	/**/
	"use strict";

	define([
		'backbone',
		'backbone.paginator'
	], function(Backbone, Paginator) {

		var LinkStreamCollection = Backbone.Paginator.requestPager.extend({

			paginator_core: {
				type: 'GET',
				dataType: 'json',
				url: function() {
					var base = 'http://localhost:5000/links';
					if( this.next_page_param ) {
						return base + '/' + this.next_page_param;
					} else {
						return base + '?search=css';
					}
				}
			},

			paginator_ui: {
				firstPage: 0,
				currentPage: 0,
				perPage: 15
			},

			parse: function(response) {
				this.next_page_param = response.next_page;
				return response.payload;
			}

		});

		// starts request to server to search for links with certain keyword
		// makes paginated requests - not by index, but "next"
		// server responds with json collection of links, some with preview, others without
		//  - depends on what we already have in DB
		// models handle loading of missing preview data, which might be streamed from socket.io

		return LinkStreamCollection;

	});

} ());