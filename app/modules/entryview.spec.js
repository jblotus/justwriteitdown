define(function(require) {
  "use strict";

  var Backbone = require("backbone");
  var EntryView = require("modules/entryview");

  describe("EntryView", function() {
      
    var $rootElement,
        testObj,
        myNoteText;
      
    beforeEach(function() {
      $rootElement =  $('<section id="entry"><textarea></textarea><button class="submit"></section>');
      testObj = new EntryView({
        el: $rootElement,
        collection: new Backbone.Collection()
      });
      
      myNoteText = 'asdfasdfasdf';
    });
    
    it("should exist", function() {
      expect(EntryView).to.exist;
      expect(new EntryView()).to.be.an.instanceof(EntryView);
    });
    it('should save a note when you click the save button', function() {
      $rootElement.find('textarea').val(myNoteText);
      $rootElement.find('button').trigger('click');
      
      expect(testObj.collection.length).to.equal(1);
      expect(testObj.collection.at(0).get('noteText')).equal(myNoteText);
    });
    
    it('should save not save a note with no text', function() {
      myNoteText = '   ';
      $rootElement.find('textarea').val(myNoteText);
      $rootElement.find('button').trigger('click');
      expect(testObj.collection.length).to.equal(0);
    });

  });
});
