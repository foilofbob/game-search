'use strict';

require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		handlebars: {
			exports: 'Handlebars'
		}
	},
	paths: {
		jquery: '../node_modules/jquery/dist/jquery',
		underscore: '../node_modules/underscore/underscore',
		backbone: '../node_modules/backbone/backbone',
		handlebars: '../node_modules/handlebars/dist/handlebars',
		text: '../node_modules/requirejs-text/text'
	}
});


// require([
// 	'backbone',
// 	'views/Browse',
// 	'routers/router'
// ], function (Backbone, Browse, Workspace) {
// 	new Workspace();
// 	Backbone.history.start();
//
// 	new Browse();
// });
