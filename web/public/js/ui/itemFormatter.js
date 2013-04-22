(function() {
	/*global define*/
	"use strict";

	define(['lo-dash'], function(_) {

		var MIN_CONTENT_IMAGE_SIZE = 200;

		var formats = {
			embedly: (function() {
				// item = {_base: embedlyJSON}
				function getImage(item) {
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

				function getDescription(item) {
					item.description = ( item._base.description ? item._base.description : undefined );
					return item;
				}

				function getTitle(item) {
					item.title = ( item._base.title ? item._base.title : undefined );
					return item;
				}

				function getUrl(item) {
					item.url = ( item._base.url ? item._base.url : undefined );
					return item;
				}

				return _.compose(getImage, getDescription, getTitle, getUrl);
			} ())
		};

		function ItemFormatter(format) {
			this._format = format;
		}

		ItemFormatter.prototype = {};

		ItemFormatter.prototype.format = function(item) {
			var data = formats[this._format](item.toJSON());
			item.set(data);

			return item;
		};

		return ItemFormatter;

	});
}());