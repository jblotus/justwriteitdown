define(function(require) {
  "use strict";
 
  var NoteCollection = require("modules/notecollection");

  describe("NoteColleciton", function() {
    it("should exist", function() {
      expect(NoteCollection).toBeDefined();
      expect(new NoteCollection() instanceof NoteCollection).toBeTruthy();
    });
    
    it("should load models from localStorage", function() {
      
      var items = [{ id: 'note-1'}, { id: 'note-2'}];
      var noteCollection = new NoteCollection();
      spyOn(noteCollection.localStorageHelper, 'getItemsByPrefix').andCallFake(function() {
        return items;
      });
      noteCollection.fetch();
      expect(noteCollection.localStorageHelper.getItemsByPrefix).toHaveBeenCalled();
      
      expect(noteCollection.at(0).get('id')).toBe('note-1');
      expect(noteCollection.at(1).get('id')).toBe('note-2');
    });

  });
});
