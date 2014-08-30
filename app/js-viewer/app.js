
module.exports = function () {
  var worksheet = require("../js-viewer/worksheet-viewer.js");
  var worksheetParser = require("imports?segment=../js-viewer/segment-viewer,utils=../js/utils!../js/worksheetParser");

  var self = {};

  self.worksheet = ko.observable();
  self.filename = ko.observable("");
  self.title = ko.computed(function () {
    if (self.filename() === "") return "Gorilla REPL viewer";
    else return "Gorilla REPL viewer: " + self.filename();
  });
  self.sourceURL = ko.observable("");
  self.source = ko.observable("");

  // The copyBox is a UI element that gives links to the source of the worksheet, and how to copy/edit it.
  self.copyBoxVisible = ko.observable(false);
  self.showCopyBox = function () {
    self.copyBoxVisible(true);
  };
  self.hideCopyBox = function () {
    self.copyBoxVisible(false);
  };

  self.start = function (worksheetData, sourceURL, worksheetName, source) {

    var ws = worksheet();
    ws.segments = ko.observableArray(worksheetParser.parse(worksheetData));
    self.worksheet(ws);
    self.sourceURL(sourceURL);
    self.filename(worksheetName);
    self.source(source);

    // wire up the UI
    ko.applyBindings(self, document.getElementById("document"));

    // we only use CodeMirror to syntax highlight the code in the viewer
    CodeMirror.colorize($("pre.static-code"), "text/x-clojure");

  };

  return self;
};