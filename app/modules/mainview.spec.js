define(function(require) {
  "use strict";

  var Backbone = require("backbone");
  var EntryView = require("modules/entryview");
  var NotesView = require("modules/notesview");
  var MainView = require("modules/mainview");

  describe("MainView", function() {
      
    var collection;
      
    beforeEach(function() {
      collection = new Backbone.Collection();
    });
    
    it("should exist", function() {
      expect(MainView).toBeDefined();
      expect(new MainView({ collection: collection }) instanceof MainView).toBeTruthy();
    });
    
    
    it("should call child views correctly", function() {
      var mainView = new MainView({ collection: collection });
      expect(mainView.entryView instanceof EntryView).toBeTruthy();
      expect(mainView.notesView instanceof NotesView).toBeTruthy();
      expect(mainView.entryView.collection).toBe(collection);
      expect(mainView.notesView.collection).toBe(collection);
    });
  });
});
