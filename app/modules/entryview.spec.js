define(function(require) {
  "use strict";

  var Backbone = require("backbone");
  var EntryView = require("modules/entryview");
  var Note = require("modules/note");

  describe("EntryView", function() {
      
    var $rootElement,
        testObj,
        collection,
        $textArea,
        $saveButton,
        myNoteText;
      
    beforeEach(function() {
      $rootElement =  $('<section id="entry"><textarea></textarea><button class="submit"></section>');
      collection = new Backbone.Collection();

      testObj = new EntryView({
        el: $rootElement,
        collection: collection
      });
      
      myNoteText = 'asdfasdfasdf';
      $textArea = $rootElement.find('textarea');
      $saveButton = $rootElement.find('button');
      
      $textArea.val(myNoteText);
    });
    
    it("should exist", function() {
      expect(EntryView).toBeDefined();
      expect(new EntryView() instanceof EntryView).toBeTruthy();
    });
    
    it('should save a note when you click the save button', function() {
      $saveButton.trigger('click');
      expect(testObj.collection.length).toEqual(1);
      expect(testObj.collection.at(0).get('noteText')).toEqual(myNoteText);
    });
    
    it('should add the note to the collection correctly', function() {
      spyOn(testObj.collection, 'add').andCallFake(function(model) {
        expect(model instanceof Note).toBeTruthy();
        expect(model.get('noteText')).toEqual(myNoteText);
      });
      $saveButton.trigger('click');
      expect(testObj.collection.add).toHaveBeenCalled();
    });
    
    it('should save not save a note with no text', function() {
      myNoteText = '   ';
      $textArea.val(myNoteText);
      $saveButton.trigger('click');
      expect(testObj.collection.length).toEqual(0);
    });
    
    it('should clear the text field after saving', function() {
      $saveButton.trigger('click');
      expect($textArea.val()).toBe('');
    });
   
  });
});
