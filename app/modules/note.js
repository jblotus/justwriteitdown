define(function(require, exports, module) {
  "use strict";
  
  var Backbone = require('backbone');
  var LocalStorageHelper = require('modules/localstoragehelper');
  var localStorageHelper = new LocalStorageHelper();
 
  var Note = Backbone.Model.extend({
    
    localStorageHelper: localStorageHelper,
    
    defaults: function() {
      return {
        'created_on' : new Date()
      };
    },
    
    sync: function(method, model, options) {
       
      if (method === 'create') {
        var id = _.uniqueId('note-');
        this.set('id', id);
        this.localStorageHelper.set(id, model);
        
      } else if (method === 'delete') {
        this.localStorageHelper.delete(this.get('id'));
      }
    }
      
  });

  module.exports = Note;
});