requirejs(['./requireConfig'], function (requireConfig) {
	require([
		'backbone',
		'views/Browse'
	], function (Backbone, Browse) {
		Backbone.history.start();

		new Browse();
	});
});
