define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");
  var MainView = require("modules/mainview");
  var NoteCollection = require('modules/notecollection');

  // Defining the application router.
  module.exports = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      var collection = new NoteCollection();
      collection.fetch();
      
      var mainView = new MainView({
        collection: collection
      });
    }
  });
});
