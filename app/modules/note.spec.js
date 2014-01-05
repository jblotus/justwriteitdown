define(function(require) {
  "use strict";

  var Backbone = require("backbone");
  var Note = require("modules/note");

  describe("Note", function() {
    it("should exist", function() {
      expect(Note).toBeDefined();
      expect(new Note() instanceof Note).toBeTruthy();
    });

  });
});
