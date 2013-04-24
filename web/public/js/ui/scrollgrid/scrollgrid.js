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
			this.$container.on('click', '.item', function(event) {
				// we need to use currentTarget when using event delegation with child element selector
				alert( $(event.currentTarget).data('url'));
			})
			require(['masonry', 'imagesLoaded'], function() {
				self.$container.masonry({
					itemSelector: '.item',
					columnWidth: 206
				});
				self.initScrollListener(function() {
					self.fillRows(1)
				});
			});

		};

		ScrollGrid.prototype.initScrollListener = function(callback) {
			var $window = $(window),
				$document = $(document),
				scrollThrottle = 50,
				scrollTimeout;

			$window.on('scroll', function() {
				clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(function() {
					if( $window.scrollTop() + $window.height() > getDocHeight() - 50) {
						callback();
					}
				}, scrollThrottle);
			});

			function getDocHeight() {
				var D = document;
				return Math.max(
					Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
					Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
					Math.max(D.body.clientHeight, D.documentElement.clientHeight)
				);
			}
		};

		ScrollGrid.prototype.createSquare = function() {
			var s = new Square(this.queue, this.itemFormatter);
			this.items.push(s);
			return s;
		};

		ScrollGrid.prototype.start = function() {
			this.fillVisibleArea();
		};

		ScrollGrid.prototype.fillVisibleArea = function() {
			this.fillRows( this.getNumberOfRowsPerScreen() );
		};

		ScrollGrid.prototype.fillRows = function(numberOfRowsToInsert) {
			var totalNumberOfItemsPerRow = this.getNumberOfItemsPerRow();
			var remainingItemsToPlaceOnCurrentRow = totalNumberOfItemsPerRow;
			App.events.on('itemReadyToPlaceOnRow', function(item) {
				this.itemsPendingToInsert.add(item);
				if( this.itemsPendingToInsert.length === totalNumberOfItemsPerRow ) {
					this.insertHiddenElements();
					this.itemsPendingToInsert.reset();
					numberOfRowsToInsert -= 1;
					if( numberOfRowsToInsert > 0 ) {
						this.fillRows(numberOfRowsToInsert);
					}
				}
			}, this);
			while( remainingItemsToPlaceOnCurrentRow > 0 ) {
				var s = this.createSquare();
				remainingItemsToPlaceOnCurrentRow -= 1;
			}
		};

		ScrollGrid.prototype.getNumberOfItemsPerRow = function() {
			return  Math.floor( (this.$container.width() / 200));
		};

		ScrollGrid.prototype.getNumberOfRowsPerScreen = function() {
			return Math.ceil( (window.innerHeight / 200));
		};

		ScrollGrid.prototype.insertHiddenElements = function() {
			var $content = $('.hiddenitemholder').children();
			// TODO - use imagesLoaded
			this.$container.append($content).masonry('appended', $content, true);
			$('.hiddenitemholder').empty();
		};

		return ScrollGrid;

	});
}());