require({

	baseUrl: '/base'

	}, [
		'client/src/core/feed_test',
		'client/src/core/queue_test',
		'client/src/ui/itemProvider_test',
		'client/src/ui/grid/grid_test',
		'client/src/ui/grid/square_test'
	], function() {
		window.__karma__.start();
});
