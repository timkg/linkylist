(function() {
	/*global define*/
	"use strict";

	define([], function(Queue) {

		var MIN_CONTENT_IMAGE_SIZE = 200;

		function ItemProvider(queue) {
			this.queue = queue;
		}

		ItemProvider.prototype = {};

		ItemProvider.prototype.getItemContent = function(item) {
			var image = {}, description = {};

			if( item.thumbnail_height && item.thumbnail_width && item.thumbnail_url ) {

				// TODO - don't hardcode embed.ly's response format, use configurable format adapter
				if( ( item.thumbnail_height >= MIN_CONTENT_IMAGE_SIZE) && (item.thumbnail_width && item.thumbnail_width >= MIN_CONTENT_IMAGE_SIZE) ) {
					image = {
						height: item.thumbnail_height,
						width: item.thumbnail_width,
						url: item.thumbnail_url,
						type: 'full-image'
					};
				} else if ( item.thumbnail_height >= MIN_CONTENT_IMAGE_SIZE ) {
					image = {
						height: item.thumbnail_height,
						width: item.thumbnail_width,
						url: item.thumbnail_url,
						type: 'col-halfrow-image'
					};
				} else if ( item.thumbnail_width >= MIN_CONTENT_IMAGE_SIZE ) {
					image = {
						height: item.thumbnail_height,
						width: item.thumbnail_width,
						url: item.thumbnail_url,
						type: 'halfcol-row-image'
					};
				} else {
					image = {
						height: item.thumbnail_height,
						width: item.thumbnail_width,
						url: item.thumbnail_url,
						type: 'inline-image'
					};
				}
			}

			if( item.description ) {
				description = item.description;
			}

			return {
				image: image,
				description: description
			};

		};

		ItemProvider.prototype.next = function() {
			return this.queue.next();
		};

		// TODO - remove duplication
		ItemProvider.prototype.getSquare = function(queue) {
			var item = queue.searchAndRetrieve(function(item) {
				var contents = this.getItemContent(item);
				if( contents.image || contents.description ) {
					return true;
				}
				return false;
			}.bind(this));
			return item;
		};

		// TODO - remove duplication
		ItemProvider.prototype.getHorizontal = function(queue) {
			var item = queue.searchAndRetrieve(function(item) {
				var contents = this.getItemContent(item);
				if( contents.image && contents.description ) {
					return true;
				}
				return false;
			}.bind(this));
			return item;
		};

		// TODO - remove duplication
		ItemProvider.prototype.getVertical = function(queue) {
			var item = queue.searchAndRetrieve(function(item) {
				var contents = this.getItemContent(item);
				if( contents.image && contents.description ) {
					return true;
				}
				return false;
			}.bind(this));
			return item;
		};

		return ItemProvider;

	});
}());