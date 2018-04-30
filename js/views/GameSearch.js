define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'collections/Games',
	'text!views/templates/gameSearchTemplate.hbs',
	'common'
], function($, _, Backbone, Handlebars, Games, tmpl, Common){
	'use strict';

	var GameSearchView = Backbone.View.extend({
		el: $('.games-container'),
		template: Handlebars.compile(tmpl),
		events: {
			'click #prevGamesPage': 'previous',
			'click #nextGamesPage': 'next',
			'click .addToCart': 'addToCart'
		},

		initialize: function(){
			var storedCart = sessionStorage.getItem('cart');
			if(storedCart){
				Common.cart = JSON.parse(storedCart);
			}

			this.games = new Games();
			this.listenTo(this.games, 'request', this.showLoading);
			this.listenTo(this.games, 'sync', this.render);

			this.games.fetchWrapper();
			this.showLoading();
		},

		render: function(){
			var data = {
				total: this.games.total,
				start: this.games.offset + 1,
				end: this.games.offset + this.games.count,
				showPrev: this.games.offset > 0,
				showNext: this.games.offset + this.games.count < this.games.total,
				games: this.games.models,
				cartCount: Common.cart.length
			};
			this.$el.html(this.template(data));

			return this;
		},

		showLoading: function(){
			this.$el.html("<div class='loading'>Loading...</div>");
		},

		performSearch: function(searchValue){
			this.showLoading();
			this.searchValue = searchValue;
			this.games.search(searchValue);
		},

		previous: function(){
			this.games.search(this.searchValue, this.games.offset - 50);
		},

		next: function(){
			this.games.search(this.searchValue, this.games.offset + 50);
		},

		addToCart: function(event){
			var gameId = event.target.attributes.getNamedItem('gameId').value;

			var alreadyInCart = _.filter(Common.cart, function(game){
				return game.id == gameId;
			});

			if(alreadyInCart.length > 0){
				alert("Game '" + alreadyInCart[0].name + "' is already in the cart.");
			} else {
				Common.cart.push(this.games.findGame(gameId).attributes);
				sessionStorage.setItem('cart', JSON.stringify(Common.cart));
				this.updateCart();
			}
		},

		updateCart: function(){
			$('#cartLink').html("Cart(" + Common.cart.length + ")");
		}
	});

	return GameSearchView;
});
