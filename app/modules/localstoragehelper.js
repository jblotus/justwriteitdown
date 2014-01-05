define(function(require, exports, module) {
  "use strict";
  
  var LocalStorageHelper = function() {
  }
  
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
    }
  }

  module.exports = LocalStorageHelper;
});