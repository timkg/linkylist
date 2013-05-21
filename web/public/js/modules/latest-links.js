(function () {
	/**/
	"use strict";

	define([
		'collections/latestLinkCollection'
	], function(LatestLinkCollection) {

		var LatestLinks = {};
		LatestLinks.name = 'latest-boards';
		LatestLinks.init = function(app, ui) {
			var links = new LatestLinkCollection([], app.get('socket'));
			console.log('llinks here');
			return links;
		};

		return LatestLinks;

	});

}());