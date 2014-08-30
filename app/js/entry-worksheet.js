require("script!../jslib/markdown/Markdown.Converter.js");
require("script!../jslib/markdown/Markdown.Sanitizer.js");
require("script!../jslib/jquery/jquery-1.10.2.min.js");
require("script!../jslib/underscore/underscore.min.js");
require("script!../jslib/knockoutjs/knockout-3.0.0.min.js");
require("script!../jslib/codemirror-3.20/lib/codemirror.js");
require("script!../jslib/codemirror-3.20/addon/edit/closebrackets.js");
require("script!../jslib/codemirror-3.20/addon/edit/matchbrackets.js");
require("script!../jslib/codemirror-3.20/addon/runmode/runmode.js");
require("script!../jslib/codemirror-3.20/addon/runmode/colorize.js");
require("script!../jslib/codemirror-3.20/addon/hint/show-hint.js");
require("script!../jslib/codemirror-3.20/mode/clojure/clojure.js");
require("script!../jslib/codemirror-3.20/mode/markdown/markdown.js");
require("script!../jslib/codemirror-3.20/mode/xml/xml.js");
require("script!../jslib/d3/d3.v3.min.js");
require("script!../jslib/d3/d3.geo.projection.min.js");
require("script!../jslib/vega/vega.1.3.3.min.js");
require("script!../jslib/uuid/uuid.core.js");
require("script!../jslib/mousetrap/mousetrap.min.js");

var _ = require('lodash');

var root = window;
root.cljserver = require('./cljserver');
root.eventBus = require("./eventbus.js");
_.merge(root, require("./commandList.js"));

root.commandProcessor = require("./commandProcessor.js");
root.repl = require("./repl-ws.js");
root.utils = require("./utils.js");
root.worksheetParser = require("./worksheetParser.js");
root.evaluator = require("./evaluator.js");
root.codemirrorVM = require("./codemirrorVM.js");
root.clojureCompleter = require("./completions.js");

_.merge(root, require("./renderer.js"));
_.merge(root, require("./segment.js"));
root.worksheet = require("./worksheet.js");
root.palette = require("./palette.js");
root.saveDialog = require("./saveDialog.js");
root.codeDialog = require("./codeDialog.js");


require("./mathJaxViewer.js");
require("./outputViewer.js");
require("./main.js");
