define(function(require, exports, module) {
  "use strict";
  
  var LocalStorageHelper = function() {
  };
  
  LocalStorageHelper.prototype = {
    prefix: 'justwriteitdown-',
    get: function(key) {
      return JSON.parse(localStorage.getItem(this.prefix + key));
    },
    set: function(key, value) {
      return localStorage.setItem(this.prefix + key, JSON.stringify(value));
    },
    delete: function(key) {
      return localStorage.removeItem(this.prefix + key);
    },
    getItemsByPrefix: function(key) {
      var reg = new RegExp('justwriteitdown-(' + key + '-.+)'),
          items = [], 
          i,
          matches;
          
      for (i in localStorage) {
        
        matches = i.match(reg);
        if (!matches) { 
          continue;
        }
        
        if (matches[1] !== undefined) {
          items.push(this.get(matches[1]));
        }
      }
      
      return items;
    }
  };

  module.exports = LocalStorageHelper;
});