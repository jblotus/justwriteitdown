define(function(require) {
  "use strict";

  var Backbone = require("backbone");
  var LocalStorageHelper = require("modules/localstoragehelper");

  describe("LocalStorageHelper", function() {
      
    var key = 'mysubkey';
    var testObj;
      
    beforeEach(function() {
      
      localStorage.clear();
       
      testObj = new LocalStorageHelper();
    });
    
    it("should exist", function() {
      expect(LocalStorageHelper).toBeDefined();
      expect(new LocalStorageHelper() instanceof LocalStorageHelper).toBeTruthy();
    });
    
    it('should save all items with a prefix of "justwriteitdown-" and JSON stringified', function() {
      var value = 'something';
      spyOn(localStorage, 'setItem');
       
      testObj.set(key, value);
      
      expect(localStorage.setItem).toHaveBeenCalledWith('justwriteitdown-' + key, JSON.stringify(value));
      
      value = {'something' : 'else'};
      testObj.set(key, value);
      expect(localStorage.setItem).toHaveBeenCalledWith('justwriteitdown-' + key, JSON.stringify(value));
    });
    
    it('should retrieve items from localstorage using the "justwriteitdown-" prefix and JSON parsed', function() {

      var value = JSON.stringify({ 'something' : 'i want' }),
          actual;
          
      spyOn(localStorage, 'getItem').andCallFake(function() {
        return value;
      });
      
      actual = testObj.get(key);
     
      expect(localStorage.getItem).toHaveBeenCalledWith('justwriteitdown-' + key);
    });
    
    it('should be able to remove an item using the "justwriteitdown-" prefix', function() {
      spyOn(localStorage, 'removeItem');
      testObj.delete(key);
      expect(localStorage.removeItem).toHaveBeenCalledWith('justwriteitdown-' + key);
    });
    
    it('should be able to pull all items matching a prefix', function() {
      
      var item1 = 'foo';
      var item2 = {'bar' : 'baz'};
      localStorage.setItem('justwriteitdown-' + key + '-test', JSON.stringify(item1)); 
      localStorage.setItem('justwriteitdown-' + key + '-test1', JSON.stringify(item2));
      
      var actual = testObj.getItemsByPrefix(key); 
      expect(actual[0]).toEqual(item1);
      expect(actual[1]).toEqual(item2);
    });
  });
});
