(function () {
	/**/
	"use strict";

	define([
		'collections/latestBoardCollection'
	], function(LatestBoardCollection) {

		var LatestBoards = {};
		LatestBoards.name = 'latest-boards';
		LatestBoards.init = function(app, ui) {
			var boards = new LatestBoardCollection([], app.get('socket'));
			console.log('lboards here');
			return boards;
		};

		return LatestBoards;

	});

}());