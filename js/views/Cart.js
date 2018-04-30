define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'text!views/templates/cartTemplate.hbs',
	'common'
], function($, _, Backbone, Handlebars, tmpl, Common){
	'use strict';

	var PageView = Backbone.View.extend({
		el: $('.cart-container'),
		template: Handlebars.compile(tmpl),
		events: {
			'click .removeFromCart': 'removeFromCart',
			'click #checkoutButton': 'checkout'
		},

		initialize: function(){
			var storedCart = sessionStorage.getItem('cart');
			if(storedCart){
				Common.cart = JSON.parse(storedCart);
			}

			this.render();
		},

		render: function(){
			this.$el.html(this.template({count: Common.cart.length, games: Common.cart}));

			return this;
		},

		removeFromCart: function(){
			var gameId = event.target.attributes.getNamedItem('gameId').value;
			Common.cart = _.without(Common.cart, _.findWhere(Common.cart, {
				id: parseInt(gameId)
			}));
			sessionStorage.setItem('cart', JSON.stringify(Common.cart));

			if(Common.cart.length == 0){
				$('#checkoutButton').prop("disabled",true);
			}
			$(event.target).parent().parent().remove();
			this.updateCart();
		},

		updateCart: function(){
			$('.count').html("Your Cart (" + Common.cart.length + " items)");
		},

		checkout: function(){
			alert("Checkout Complete!");
			Common.cart = [];
			sessionStorage.removeItem('cart');
			window.location.href = '/';
		}
	});

	return PageView;
});
