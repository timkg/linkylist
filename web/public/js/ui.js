(function () {
	/*global define, require*/
	"use strict";

	define([
		'jquery'
		, 'lo-dash'
	], function($, _) {
		// load foundation + topbar
		// ------------------------
		require([
			'topbar'
		], function() {
				$(document).foundation();
		});


		// ui wrapper object which contains $ and some utility functions
		// -------------------------------------------------------------
		var ui = {};
		ui.$ = $;

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