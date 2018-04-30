define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'views/GameSearch',
	'text!views/templates/browseTemplate.hbs'
], function($, _, Backbone, Handlebars, GameSearch, tmpl){
	'use strict';

	var PageView = Backbone.View.extend({
		el: $('.game-search-field'),
		template: Handlebars.compile(tmpl),
		events: {
			'click #searchButton':   'search'
		},

		initialize: function(){
			this.gameSearchView = new GameSearch();
			this.render();
		},

		render: function(){
			this.$el.html(this.template());

			return this;
		},

		search: function(){
			var searchValue = $('#gameNameInput').val().trim();
			this.gameSearchView.performSearch(searchValue);
		}
	});

	return PageView;
});
