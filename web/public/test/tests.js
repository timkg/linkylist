(function() {
	/*global require, window, document*/
	"use strict";

	require.config({
		baseUrl: '../..',

		shim: {
			'backbone': {
				deps: ['lo-dash', 'jquery'],
				exports: 'Backbone'
			},
			'lo-dash': {
				exports: '_'
			}
		}

	});

	require(['client/src/ui/grid/grid', 'client/src/ui/element'], function(Grid, Element) {
		var grid = window.grid = new Grid(3, 2, function(square) {
			square.requestItem();
		});

		var container = document.querySelector('.itemholder');

		grid.all(function(square) {
			console.log(square.x, square.y);
			var e = new Element(square.item);
			var d = document.createElement('div');
			d.innerHTML = e.render();
			var innerD = d.querySelector('.item');
			innerD.classList.add('origin' + square.x + square.y);
			container.appendChild(d);
		});
	});
}());