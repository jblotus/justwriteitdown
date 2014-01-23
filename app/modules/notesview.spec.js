define(function(require) {
  "use strict";

  var Backbone = require("backbone");
  var NotesView = require("modules/notesview");

  describe("NotesView", function() {
      
    var $rootElement,
        testObj,
        collection,
        $textArea,
        $saveButton,
        myNoteText;
      
    beforeEach(function() {
      $rootElement =  $('<section id="notes">' +
       '<script id="saved-notes" type="text/x-underscore-template">' +
          '<ol>' +
           '<% _.each(notes, function(note) { %>' +
             '<li data-id="<%- note.id %>"><%- note.get("noteText") %> <a class="remove" href="javascript:void(0)">Remove</a></li>' +
           '<% }); %>' +
          '</ol>' +
        '</script></section>');
      collection = new Backbone.Collection();

      testObj = new NotesView({
        el: $rootElement,
        collection: collection 
      });
        
      
    });
    
    it("should exist", function() {
      expect(NotesView).toBeDefined();
      expect(testObj instanceof NotesView).toBeTruthy();
    });
    
    it('should remove a note from the collection when you click remove', function() {
      var fakeModel = jasmine.createSpyObj('FakeNote', ['destroy']);
      fakeModel.id = 123;
      
      
      testObj.collection.add(fakeModel);
      
      spyOn(testObj.collection, 'get').andCallFake(function() {
        return fakeModel;
      });

      testObj.$el.find('ol .remove').trigger('click');
      expect(fakeModel.destroy).toHaveBeenCalled();
    });
   
  });
});
