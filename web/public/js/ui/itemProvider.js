(function() {
	/*global define*/
	"use strict";

	define(['lo-dash'], function(_) {

		var MIN_CONTENT_IMAGE_SIZE = 200;
		var embedlyFormatIterator = (function() {
			// item = {_base: embedlyJSON}
			function image(item) {
				var image;
				if( item._base.thumbnail_height && item._base.thumbnail_width && item._base.thumbnail_url ) {
					if( ( item._base.thumbnail_height >= MIN_CONTENT_IMAGE_SIZE) && (item._base.thumbnail_width && item._base.thumbnail_width >= MIN_CONTENT_IMAGE_SIZE) ) {
						image = {
							height: item._base.thumbnail_height,
							width: item._base.thumbnail_width,
							url: item._base.thumbnail_url,
							type: 'full-image'
						};
					} else if ( item._base.thumbnail_height >= MIN_CONTENT_IMAGE_SIZE ) {
						image = {
							height: item._base.thumbnail_height,
							width: item._base.thumbnail_width,
							url: item._base.thumbnail_url,
							type: 'col-halfrow-image'
						};
					} else if ( item._base.thumbnail_width >= MIN_CONTENT_IMAGE_SIZE ) {
						image = {
							height: item._base.thumbnail_height,
							width: item._base.thumbnail_width,
							url: item._base.thumbnail_url,
							type: 'halfcol-row-image'
						};
					} else {
						image = {
							height: item._base.thumbnail_height,
							width: item._base.thumbnail_width,
							url: item._base.thumbnail_url,
							type: 'inline-image'
						};
					}
				}
				item.image = image;
				return item;
			}

			function description(item) {
				item.description = ( item._base.description ? item._base.description : undefined );
				 return item;
			}

			function title(item) {
				item.title = ( item._base.title ? item._base.title : undefined );
				return item;
			}

			function url(item) {
				item.url = ( item._base.url ? item._base.url : undefined );
				return item;
			}

			return _.compose(image, description, title, url);
		} ());

		function ItemProvider(queue) {
			this.queue = queue;
		}

		ItemProvider.prototype = {};

		ItemProvider.prototype.setItemContent = function(item) {
			var data = embedlyFormatIterator(item.toJSON());
			item.set(data);

			return item;
		};

		ItemProvider.prototype.next = function() {
			var item = this.queue.next();
			console.log(item);
			return this.setItemContent(item);
		};


		return ItemProvider;

	});
}());