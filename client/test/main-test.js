require({

	baseUrl: '/base'

	}, [
		'client/src/ui/formatter_test',
		'client/src/core/queue_test'
		], function() {
		window.__karma__.start();
});
