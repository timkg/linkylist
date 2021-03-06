(function () {
	/*global define*/
	"use strict";

	var backbone = 'backbone' // prevent r.js from including backbone
		, backbonePaginator = 'backbone.paginator';
	define([
		backbone,
		backbonePaginator
	], function(Backbone, Paginator) {

		var LinkStreamCollection = Backbone.Paginator.requestPager.extend({

			currentPage: 0,

			paginator_core: {
				type: 'GET',
				dataType: 'json',
				url: function() {
					var base = '/stream';
					if( this.next_page_param ) {
						return base + '/' + this.next_page_param;
					} else {
						return base + '?search=css';
					}
				}
			},

			parse: function(response) {
				this.next_page_param = encodeURIComponent(response.next_page);
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