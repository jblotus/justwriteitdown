define(function(require, exports, module) {
  "use strict";
  
  var Backbone = require('backbone');
  var EntryView = require('modules/entryview');
  var NotesView = require('modules/notesview');
  var NoteCollection = require('modules/notecollection');
  
  var MainView = Backbone.View.extend({
      el: 'main',
      initialize: function() {
        this.render();  
      },
      render: function() {
          var collection = new NoteCollection();
          var entryView = new EntryView({
              collection: collection
          });
          
          var notesView = new NotesView({
              collection: collection
         });
          
          return this;
      }
  });

  module.exports = MainView;
});