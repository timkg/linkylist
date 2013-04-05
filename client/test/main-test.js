require({

	baseUrl: '/base'

	}, [
		'client/src/core/queue_test',
		'client/src/ui/formatter_test',
		'client/src/ui/grid/grid_test',
		'client/src/ui/grid/square_test'
	], function() {
		window.__karma__.start();
});
