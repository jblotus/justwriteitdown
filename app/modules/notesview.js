define(function(require, exports, module) {
  "use strict";
  
  var Backbone = require('backbone');
  
  var NotesView = Backbone.View.extend({
      el: 'section#notes',
      template: null,
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
          var cid = $(e.currentTarget).parents('li').data('cid');
          this.collection.remove(cid);
      },
      
      render: function() {
          var markup = this.template({ notes: this.collection.models });
          this.$el.html(markup);
          return this;
      }
  });

  module.exports = NotesView;
});