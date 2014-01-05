define(function(require, exports, module) {
  "use strict";
  
  var Backbone = require('backbone');
  var Note = require('modules/note');
  
  var EntryView = Backbone.View.extend({
      el: 'section#entry',
      events: {
          'click .submit': "saveNote"
      },
      initialize: function() {
        this.render();  
      },
      saveNote: function() {
        var $textArea = this.$el.find('textarea');
        var noteText = $.trim($textArea.val());
        
        if (!noteText) {
          return;
        }
        
        this.collection.create(new Note({ noteText: noteText }));
        
        $textArea.val('');
      },
      render: function() {
          return this;
      }
  });

  module.exports = EntryView;
});