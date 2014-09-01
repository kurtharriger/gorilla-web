/*
 * This file is part of gorilla-repl. Copyright (C) 2014-, Jony Hudson.
 *
 * gorilla-repl is licenced to you under the MIT licence. See the file LICENCE.txt for full details.
 */

var utils = require('./utils');
var codemirrorVM = require("./codemirrorVM");
var worksheet = require('./worksheet');

// a code segment contains code, and shows the results of running that code.
module.exports.codeSegment = function (contents, consoleText, output) {
    var eventBus = require('./eventBus');
    var self = {};
    self.renderTemplate = "code-segment-template";
    self.worksheet = worksheet;
    self.id = UUID.generate();
    self.type = "code";

    // Segment UI state
    self.active = ko.observable(false);
    self.errorText = ko.observable("");
    if (consoleText) self.consoleText = ko.observable(consoleText);
    else self.consoleText = ko.observable("");
    if (output) self.output = ko.observable(output);
    else self.output = ko.observable("");
    self.runningIndicator = ko.observable(false);

    // The code
    // handle null contents
    if (contents === null) contents = "";
    self.content = codemirrorVM(
        self.id,
        contents,
        "text/x-clojure"
    );

    self.getContents = function() {
        return self.content.contents();
    };

    self.clearErrorAndConsole = function () {
        self.errorText("");
        self.consoleText("");
    };

    self.clearOutput = function () {
        self.output("");
    };


    // activation and deactivation - these control whether the segment has the "cursor" outline, and focus
    // the content component.

    // activate the segment. fromTop will be true is the user's focus is coming from above (and so the cursor should
    // be placed at the top), false indicates the focus is coming from below.
    self.activate = function (fromTop) {
        self.active(true);
        if (fromTop) self.content.positionCursorAtContentStart();
        else self.content.positionCursorAtContentEnd();
    };

    self.deactivate = function () {
        self.content.blur();
        self.active(false);
    };



    // serialises the segment for saving. The result is valid clojure code, marked up with some magic comments.
    self.toClojure = function () {
        var startTag = ";; @@\n";
        var endTag = "\n;; @@\n";
        var outputStart = ";; =>\n";
        var outputEnd = "\n;; <=\n";
        var consoleStart = ";; ->\n";
        var consoleEnd = "\n;; <-\n";
        var cText = "";
        var oText = "";

        if (self.consoleText() !== "") cText = consoleStart + utils.makeClojureComment(self.consoleText()) + consoleEnd;
        if (self.output() !== "") oText = outputStart + utils.makeClojureComment(self.output()) + outputEnd;

        return startTag + self.getContents() + endTag + cText + oText;
    };

    return self;
};

// a free segment contains markdown
module.exports.freeSegment = function (contents, meta) {
    var eventBus = require('./eventBus');

    meta = meta || {};
    var self = {};
    self.renderTemplate = "free-segment-template";
    self.id = UUID.generate();

    self.type = "free";
    self.answer = ko.observable(false);

    // Segment UI state
    self.active = ko.observable(false);
    self.markupVisible = ko.observable(false);

    self.answer = ko.observable(!!meta.answer);

    // The markup
    // handle null contents
    if (contents === null) contents = "";
    self.content = codemirrorVM(
        self.id,
        contents,
        "text/x-markdown"
    );

    self.getContents = function() {
        return self.content.contents();
    };

    self.getMeta = function() {
      var meta = "";
      if(self.answer()) {
        meta = ";; " + JSON.stringify({"answer": true}) + "\n";
      }
      return meta;
    };

    // var mdConverter = Markdown.getSanitizingConverter();
    var mdConverter = new Markdown.Converter();

    self.renderedContent = ko.computed(function () {
        return mdConverter.makeHtml(self.content.contents());
    }).extend({throttle: 250});

    self.handleClick = function () {
        eventBus.trigger("worksheet:segment-clicked", {id: self.id})
    };

    // activation and deactivation - these control whether the segment has the "cursor" outline, and focus
    // the content component.

    // activate the segment. fromTop will be true is the user's focus is coming from above (and so the cursor should
    // be placed at the top), false indicates the focus is coming from below.
    self.activate = function (fromTop) {
        self.markupVisible(true);
        self.content.reflow();
        self.active(true);
        if (fromTop) self.content.positionCursorAtContentStart();
        else self.content.positionCursorAtContentEnd();
    };

    self.deactivate = function () {
        self.content.blur();
        self.markupVisible(false);
        self.active(false);

    };

    // serialises the segment for saving. The result is valid clojure code, marked up with some magic comments.
    self.toClojure = function () {
        var tag = ";; **\n";
        return tag + self.getMeta() + utils.makeClojureComment(self.getContents()) + "\n" + tag;
    };


    return self;
};