requirejs(['./requireConfig'], function (requireConfig) {
	require([
		'backbone',
		'views/Cart'
	], function (Backbone, Cart) {
		Backbone.history.start();

		new Cart();
	});
});
