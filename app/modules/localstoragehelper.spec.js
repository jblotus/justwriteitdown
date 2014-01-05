define(function(require) {
  "use strict";

  var Backbone = require("backbone");
  var LocalStorageHelper = require("modules/localstoragehelper");

  describe("LocalStorageHelper", function() {
      
    var key = 'mysubkey';
    var testObj;
      
    beforeEach(function() {
      testObj = new LocalStorageHelper();
      
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem');
      spyOn(localStorage, 'removeItem');
    });
    
    it("should exist", function() {
      expect(LocalStorageHelper).toBeDefined();
      expect(new LocalStorageHelper() instanceof LocalStorageHelper).toBeTruthy();
    });
    
    it('should save all items with a prefix of "justwriteitdown-" and JSON stringified', function() {
      var value = 'something';
      testObj.set(key, value);
      
      expect(localStorage.setItem).toHaveBeenCalledWith('justwriteitdown-' + key, JSON.stringify(value));
      
      value = {'something' : 'else'};
      testObj.set(key, value);
      expect(localStorage.setItem).toHaveBeenCalledWith('justwriteitdown-' + key, JSON.stringify(value));
    });
    
    it('should retrieve items from localstorage using the "justwriteitdown-" prefix and JSON parsed', function() {

      var value = JSON.stringify({ 'something' : 'i want' }),
          actual;
       
      localStorage.getItem.andCallFake(function() {
        return value;
      });
      
      actual = testObj.get(key);
     
      expect(localStorage.getItem).toHaveBeenCalledWith('justwriteitdown-' + key);
    });
    
    it('should be able to remove an item using the "justwriteitdown-" prefix', function() {
      testObj.delete(key);
      expect(localStorage.removeItem).toHaveBeenCalledWith('justwriteitdown-' + key);
    });
  });
});
