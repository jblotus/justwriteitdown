define(function(require) {
  "use strict";
 
  var Note = require("modules/note");

  describe("Note", function() {
    it("should exist", function() {
      expect(Note).toBeDefined();
      expect(new Note() instanceof Note).toBeTruthy();
    });
     
    
    it('should save a new note to localStorage', function() {
      
      var note = new Note({});
      spyOn(note.localStorageHelper, 'set');
      note.save({ bar: 'baz'});
      
      expect(note.localStorageHelper.set).toHaveBeenCalled();
      expect(note.get('id')).toBeDefined();
      expect(note.get('id').split('-')[0]).toBe('note'); //note should have note- prefix
      
      var anotherNote = new Note({});
      anotherNote.save({ something: 'else'});
      expect(anotherNote.get('id')).not.toEqual(note.get('id'));
      
    });
    
    it('should delete a note from localStorage', function() {
      
      var note = new Note({ foo: 'bar'});
      note.save({ bar: 'baz'});
      
      spyOn(note.localStorageHelper, 'delete');
      note.destroy();
      
      expect(note.localStorageHelper.delete).toHaveBeenCalled();
      
    });
    
    it('should store a creation date when model created', function() {
      var comparisonDate = new Date();
      var note = new Note({});
      var createdOn = note.get('created_on');
      expect(createdOn).toBeDefined();
      expect(createdOn instanceof Date).toBeTruthy();
      expect(createdOn.getYear()).toEqual(comparisonDate.getYear());
      expect(createdOn.getMonth()).toEqual(comparisonDate.getMonth());
      expect(createdOn.getDate()).toEqual(comparisonDate.getDate());
    });
  });
});
