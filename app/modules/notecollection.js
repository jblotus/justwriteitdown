define(function(require, exports, module) {
  "use strict";
  
  var Backbone = require('backbone');
  var Note = require('modules/note');
  var LocalStorageHelper = require('modules/localstoragehelper');
  var localStorageHelper = new LocalStorageHelper();
  
  var NoteCollection = Backbone.Collection.extend({
    localStorageHelper: localStorageHelper,
    
    sync: function(method, model, options) {
      var self = this;
      if (method === 'read') {
        _.each(this.localStorageHelper.getItemsByPrefix('note'), function(item) {
          self.add(new Note(item));
        });
      }
    }
  });

  module.exports = NoteCollection;
});