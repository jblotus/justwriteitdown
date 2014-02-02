define(function(require, exports, module) {
  "use strict";
  
  var Backbone = require('backbone');
  
  var LocalStorageHelper = require('modules/localstoragehelper');
  var localStorageHelper = new LocalStorageHelper();
  
  var moment = require('moment');
  
 
  var Note = Backbone.Model.extend({
    
    localStorageHelper: localStorageHelper,
    
    defaults: function() {
      return {
        'created_on' : new Date()
      };
    },
    
    getCreatedOnRaw: function() {
      return moment(this.get('created_on'));
    },
    
    getFormattedCreationDate: function() {
      var date = this.getCreatedOnRaw();
      return date.format('MM/DD/YYYY @ h:mmA');
    },
    
    sync: function(method, model, options) {
       
      if (method === 'create') {
        var id = 'note-' + this.getCreatedOnRaw();
        this.set('id', id);
        this.localStorageHelper.set(id, model);
        
      } else if (method === 'delete') {
        this.localStorageHelper.delete(this.get('id'));
      }
    }
      
  });

  module.exports = Note;
});