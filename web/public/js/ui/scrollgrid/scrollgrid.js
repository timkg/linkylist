(function() {
	/*global define, require*/
	"use strict";

	define([
		'jquery',
		'backbone',
		'../itemFormatter',
		'./square',
		'App'
	], function($, Backbone, ItemFormatter, Square, App){

		function ScrollGrid(queue) {
			this.queue = queue;
			this.items = [];
			this.itemsPendingToInsert = new Backbone.Collection();
			this.itemFormatter = new ItemFormatter('embedly');
		}

		ScrollGrid.prototype = {};

		ScrollGrid.prototype.init = function($container) {
			var self = this;
			this.$container = $container;
			require(['masonry', 'imagesLoaded'], function() {
				self.$container.masonry({
					itemSelector: '.item',
					columnWidth: 205
				});
			});
		};

		ScrollGrid.prototype.createSquare = function() {
			var s = new Square(this.queue, this.itemFormatter);
			this.items.push(s);
			return s;
		};

		ScrollGrid.prototype.fillVisibleArea = function() {
//			var self = this;
//			var count = 20,
//				df = document.createDocumentFragment();
//			while(count > 0) {
//				var s = this.createSquare();
//				df.appendChild(s.render());
//				count -= 1;
//			}
//			var $container = $(this.container);
//			$container.append(df);
//			require(['masonry', 'imagesLoaded'], function() {
//				$container.imagesLoaded(function() {
//					$container.masonry({
//						itemSelector: '.item',
//						columnWidth: 205,
//						isAnimated: true
//					});
//				});
//			})
		};


		ScrollGrid.prototype.prepareRow = function(callback) {
			callback = callback || function() {};
			var rowSize = this.getRowSize();
			var count = rowSize;
			this.itemsPendingToInsert.reset();
			App.events.on('itemReady', function(item) {
				this.itemsPendingToInsert.add(item);
				if( this.itemsPendingToInsert.length === rowSize ) {
					this.insertHiddenElements();
				}
			}, this);
			while( count > 0 ) {
				var s = this.createSquare();
				count -= 1;
			}
		};

		ScrollGrid.prototype.getRowSize = function() {
			return 5; // TODO
		};

		ScrollGrid.prototype.insertHiddenElements = function() {
			var $content = $('.hiddenitemholder').children();
			this.$container.append($content).masonry('appended', $content, true);
			$('.hiddenitemholder').empty();
		};

		ScrollGrid.prototype.onScroll = function() {

		};

		return ScrollGrid;

	});
}());