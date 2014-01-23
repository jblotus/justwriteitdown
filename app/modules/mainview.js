define(function(require, exports, module) {
  "use strict";
  
  var Backbone = require('backbone');
  var EntryView = require('modules/entryview');
  var NotesView = require('modules/notesview');
  
  var MainView = Backbone.View.extend({
      el: 'main',
      initialize: function() {
        this.render();  
      },
      entryView: null,
      notesView: null,
      collection: null,
      render: function() {
        this.entryView = new EntryView({
          collection: this.collection
        });
        
        this.notesView = new NotesView({
          collection: this.collection
        });
          
        return this;
      }
  });

  module.exports = MainView;
});