define(['client/src/queue'], function(Queue) {

	var MIN_CONTENT_IMAGE_SIZE = 100;

	function Formatter() {
		// TODO - accept format adapter
	}

	Formatter.prototype = {};

	Formatter.prototype.getItemContent = function(item) {
		var image, description, response = [];

		// TODO - don't hardcode embed.ly's response format, use configurable format adapter
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

	// TODO - remove duplication
	Formatter.prototype.getSquare = function(queue) {
		var item = queue.searchAndRetrieve(function(item) {
			var contents = this.getItemContent(item);
			if( contents.image || contents.description ) {
				return true;
			}
			return false;
		}.bind(this))
		return item;
	};

	// TODO - remove duplication
	Formatter.prototype.getHorizontal = function(queue) {
		var item = queue.searchAndRetrieve(function(item) {
			var contents = this.getItemContent(item);
			if( contents.image && contents.description ) {
				return true;
			}
			return false;
		}.bind(this))
		return item;
	};

	// TODO - remove duplication
	Formatter.prototype.getVertical = function(queue) {
		var item = queue.searchAndRetrieve(function(item) {
			var contents = this.getItemContent(item);
			if( contents.image && contents.description ) {
				return true;
			}
			return false;
		}.bind(this))
		return item;
	};

	return Formatter;

});