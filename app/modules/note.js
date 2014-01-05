define(function(require, exports, module) {
  "use strict";
  
  var Backbone = require('backbone');
  var LocalStorageHelper = require('modules/localstoragehelper');
  var localStorageHelper = new LocalStorageHelper();
 
  var Note = Backbone.Model.extend({
      sync: function(method, model, options) {
        if (method === 'create') {
          localStorageHelper.set('note-' + model.cid, model);
        }
      }
      
  });

  module.exports = Note;
});