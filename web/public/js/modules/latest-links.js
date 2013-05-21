(function () {
	/*global define*/
	"use strict";

	define([
		'collections/latestLinkCollection'
	], function(LatestLinkCollection) {

		var LatestLinks = {};
		LatestLinks.name = 'latest-boards';
		LatestLinks.init = function(app, ui) {
			var links = new LatestLinkCollection([], app.get('socket'));
			return links;
		};

		return LatestLinks;

	});

}());