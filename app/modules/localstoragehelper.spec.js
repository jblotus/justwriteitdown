define(function(require) {
  "use strict";

  var Backbone = require("backbone");
  var LocalStorageHelper = require("modules/localstoragehelper");

  describe("LocalStorageHelper", function() {
      
    var testObj;
      
    beforeEach(function() {
      testObj = new LocalStorageHelper();
      
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem');
    });
    
    it("should exist", function() {
      expect(LocalStorageHelper).toBeDefined();
      expect(new LocalStorageHelper() instanceof LocalStorageHelper).toBeTruthy();
    });
    
    it('should save all items with a prefix of "justwriteitdown-" and JSON stringified', function() {
      var key = 'mysubkey';
      var value = 'something';
      testObj.set(key, value);
      
      expect(localStorage.setItem).toHaveBeenCalledWith('justwriteitdown-' + key, JSON.stringify(value));
      
      value = {'something' : 'else'};
      testObj.set(key, value);
      expect(localStorage.setItem).toHaveBeenCalledWith('justwriteitdown-' + key, JSON.stringify(value));
    });
    
    it('should retrieve items from localstorage using the "justwriteitdown-" prefix and JSON parsed', function() {
      var key = 'mysubkey';
      var value = JSON.stringify({ 'something' : 'i want' });
       
      localStorage.getItem.andCallFake(function() {
        return value;
      });
      
      var actual = testObj.get(key);
     
      expect(localStorage.getItem).toHaveBeenCalledWith('justwriteitdown-' + key);
    });
  });
});
