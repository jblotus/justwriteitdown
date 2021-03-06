define(function(require, exports, module) {
  "use strict";
  
  var Backbone = require('backbone');
  
  var NotesView = Backbone.View.extend({
      el: 'section#notes',
      template: null,
      collection: null,
      events: {
        'click .remove': 'removeNote'  
      },
      initialize: function() {
        
        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'remove', this.render);
        this.listenTo(this.collection, 'change', this.render);
        
        this.template = _.template(this.$el.find('#saved-notes').html());
        this.render();
      },
      
      removeNote: function(e) {
        var id = $(e.currentTarget).parents('li').data('id');
        var model = this.collection.get(id);
        model.destroy();
      },
      
      render: function() {
        var markup = this.template({ notes: this.collection.models });
        this.$el.html(markup);
        return this;
      }
  });

  module.exports = NotesView;
});