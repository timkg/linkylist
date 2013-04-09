define([], function() {

	function Item(data, view) {
		this.data = data;
		this.view = view;
	}

	Item.prototype = {};

	Item.render = function() {};

	

	return Item;

});