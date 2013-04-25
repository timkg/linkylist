(function() {
	/*global define, require*/
	"use strict";

	define([
		'jquery',
		'backbone',
		'../../core/itemFormatter',
		'./linkSquareView',
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
			require(['masonry'], function() {
				self.$container.masonry({
					itemSelector: '.item',
					columnWidth: 206
				});
				self.initScrollListener(function() {
					self.fillRows(1)
				});
			});

			// TODO - remove from init()
			App.events.on('itemReadyToPlaceOnRow', function(item) {
				this.itemsPendingToInsert.add(item);
				if( this.itemsPendingToInsert.length >= this.getNumberOfItemsPerRow() ) {
					this.itemsPendingToInsert.reset();
					this.insertHiddenElements();
				}
			}, this);

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
			for(  var i = 0; i < numberOfRowsToInsert; i++ ) {
				for( var j = 0; j < totalNumberOfItemsPerRow; j++ ) {
					var s = this.createSquare(); // when ready triggers App.events.on('itemReadyToPlaceOnRow')
				}
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