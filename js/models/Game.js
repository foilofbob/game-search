define([
	'underscore',
	'backbone'
], function(_, Backbone){
	'use strict';

	var Game = Backbone.Model.extend({
		defaults: {
			id: '',
			name: '',
			icon: '',
			deck: ''
		},

		parse: function(response, options){
			return {
				id: response.id,
				name: response.name,
				icon: response.image.icon_url,
				deck: response.deck
			};
		}
	});

	return Game;
});
