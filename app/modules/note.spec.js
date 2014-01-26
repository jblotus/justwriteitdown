define(function(require) {
  "use strict";
 
  var Note = require("modules/note");
  var moment = require('moment');

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
    
    it('should be able to format the date in an easy to read format', function() {
      
      var fakeDate = moment();
      fakeDate.set('year', 1982);
      fakeDate.set('month', 4);  // May
      fakeDate.set('date', 11);
      fakeDate.set('hour', 5);
      fakeDate.set('minutes', 30);

      var note = new Note({
        created_on:  fakeDate
      });
      var formattedDate = note.getFormattedCreationDate();
      expect(formattedDate).toEqual('05/11/1982 @ 5:30AM');
    });
  });
});
