(function() {
	/*global define*/
	"use strict";

	define([
		'lo-dash',
		'jquery'
	], function(_, $) {

		var Commands = function() {
			this._handlers = {};
		};

		_.extend(Commands.prototype, {

			// register a command handler that will execute the command when requested
			handle: function(command, handler, context) {
				this._handlers[command] = {
					handler: handler
					, context: (context || this)
				};
			},

			// returns true if a handler is defined for given command
			hasHandler: function(command) {
				return !!this._handlers[command];
			},

			// let a handler execute the command
			execute: function(command, params) {
				params = _.rest(arguments, 1);
				var config = this._handlers[command];
				if (config) {
					config.handler.call(config.context, params);
				}
			},

			// hook into all DOM events with data-command, executing handlers if defined
			init: function() {
				var self = this;
				$(function() {
					$(document.body).on('click', '[data-command]', function(event) {
						var command, data, element;
						command = $(event.currentTarget).data('command');
						if (self.hasHandler(command)) {
							data = $(event.currentTarget).data();
							element = event.currentTarget;
							event.preventDefault();
							self.execute(command, {
								params: data
								, element: element
							});
						}
					});
				});
			}

		});

		return Commands;

	});

} ());