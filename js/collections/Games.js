define([
	'underscore',
	'backbone',
	'models/game'
], function(_, Backbone, Game){
	'usse strict';

	var Games = Backbone.Collection.extend({
		model: Game,
		url: "http://api.giantbomb.com/api/games/",
		initialize: function(){
			this.count = 0;
			this.total = 0;
			this.offset = 0;
		},

		parse: function(response) {
			this.count = response.number_of_page_results;
			this.total = response.number_of_total_results;

			return response.results;
		},

		fetchWrapper: function(name){
			url = "http://api.giantbomb.com/api/games/";
			var data = {
				api_key: '6b03c8c79bd2223ec85732688b9e2653aeb6e922',
				format: 'jsonp',
				field_list: 'name,image,deck,id',
				limit: 50,
				offset: this.offset
			};

			if(name){
				data.query = name;
				data.resources = 'game';
				url = "http://api.giantbomb.com/api/search/"
			}

			var completeData = {
				dataType: "jsonp",
				jsonp: 'json_callback',
				data: data,
				url: url
			};

			return this.fetch(completeData)
		},

		search: function(searchValue, offset){
			this.offset = offset || 0;
			this.fetchWrapper(searchValue);
		},

		findGame: function(id){
			var game = _.filter(this.models, function(game){
				return game.id == id;
			})[0];

			return game;
		}
	});

	return Games
});
