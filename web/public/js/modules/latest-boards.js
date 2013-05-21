(function () {
	/*global define*/
	"use strict";

	define([
		'lib/module'
		,'collections/latestBoardCollection'
		, 'views/latestBoardView'
		, 'views/latestBoardCollectionView'
	], function(Module, LatestBoardCollection, LatestBoardView, LatestBoardCollectionView) {

		var LatestBoards = new Module('latest-boards', {
			init: function(app, ui) {
				this.boards = new LatestBoardCollection([], app.get('socket'));
				this.boardCollectionView = new LatestBoardCollectionView(app, ui, this.boards, LatestBoardView);
			}
		});

		return LatestBoards;

	});

}());