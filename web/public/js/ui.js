(function () {
	/*global define, require*/
	"use strict";

	define([
		'jquery'
		, 'lo-dash'
		, './templates'
		, 'topbar'
	], function($, _, templates) {

		$(document).foundation();

		var ui = {};
		ui.$ = $;
		ui.templates = templates;

		// get name of all modules (DOM elms with data-module attribute) on current page
		// -----------------------------------------------------------------------------
		ui.getModules = function() {
			var modules = _.map($('[data-module]'), function(elm) {
				return $(elm).attr('data-module');
			});
			return modules;
		};

		return ui;
	});

}());