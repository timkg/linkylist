define([], function() {

	var MIN_CONTENT_IMAGE_SIZE = 100;

	function Formatter() {

	}

	Formatter.prototype = {};

	Formatter.prototype.getItemContent = function(item) {
		var image, description, response = [];

		// TODO - don't hardcode embed.ly's response format, create configurable adapter
		if( item.thumbnail_height && item.thumbnail_height >= MIN_CONTENT_IMAGE_SIZE && item.thumbnail_width && item.thumbnail_width >= MIN_CONTENT_IMAGE_SIZE ) {
			image = {
				height: item.thumbnail_height,
				width: item.thumbnail_width,
				url: item.thumbnail_url
			};
		}

		if( item.description ) {
			description = {};
			description.text = item.description;
			if( item.thumbnail_height && item.thumbnail_height < MIN_CONTENT_IMAGE_SIZE && item.thumbnail_width && item.thumbnail_width < MIN_CONTENT_IMAGE_SIZE ) {
				description.image = {
					height: item.thumbnail_height,
					width: item.thumbnail_width,
					url: item.thumbnail_url
				};
			}
		}

		return {
			image: image,
			description: description
		};

	};

	Formatter.prototype.getSquare = function(queue) {
		// iterate over queue
		// take first item for which getItemContent() returns 1 or 2
		// build item
	};

	Formatter.prototype.getHorizontal = function(queue) {
		// iterate over queue
		// take first item for which getItemContent() returns 2
		// build item
	};

	Formatter.prototype.getVertical = function(queue) {
		// iterate over queue
		// take first item for which getItemContent() returns 2
		// build item
	};

	return Formatter;

});