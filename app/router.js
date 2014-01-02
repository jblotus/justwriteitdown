define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");

  // Defining the application router.
  module.exports = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
        
      var Note = require("modules/note");
      
      var models = [];
      models.push(
         new Note({
             foo: 'bar'
         })
      );
      
      var MainView = require("modules/mainview");
      var mainView = new MainView({});
    }
  });
});
