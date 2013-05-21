(function () {
	/*global define*/
	"use strict";

	define([
		'lib/module'
		, 'collections/latestLinkCollection'
	], function(Module, LatestLinkCollection) {

		var LatestLinks = new Module('latest-links', {
			init: function(app, ui) {
				this.app = app;
				this.ui = ui;
				this.links = new LatestLinkCollection([], app.get('socket'));
			}
		});

		return LatestLinks;

	});

}());