(function() {
	/*global define, require*/
	"use strict";

	define([
		'jquery',
		'../../vendors/moustache',
		'text!../../../html/templates/square.html'
	], function($, Moustache, templateString){

		function Square(item) {
			this.item = item;
			this.elm = document.createElement('div');
			this.elm.setAttribute('class', 'item');
			// has states
			// ready
			// loading
			// error
		}

		Square.prototype = {};

		// TODO - clean me up
		Square.prototype.render = function() {
			var json = this.item.toJSON();
			json.image = (json.image ? json.image : {}); // shouldn be here
			var $rendered = $(Moustache.render(templateString, json));
			// this elm vs rendered.children copypasta smells aweful
			$(this.elm)
				.append($rendered.children())
				.addClass(json.image.type ? json.image.type : '')
				.find('.' + json.image.type + '-container')
					.css({'background': "url('"+json.image.url+"') no-repeat"});



			return this.elm;
		};

		return Square;
	});
}());