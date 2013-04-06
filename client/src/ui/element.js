define(['client/vendors/moustache', '../../vendors/text!client/src/views/square.html'], function(Moustache, template) {

	function Element(item) {
		this.item = JSON.parse(item); // TODO - decide where best to parse the JSON
	}

	Element.prototype = {};

	Element.prototype.render = function() {
//		console.log(this.item);
//		console.log(this.item.title);
//		console.log(this.item.description);
		return Moustache.render(template, this.item);
	};

	return Element;

});