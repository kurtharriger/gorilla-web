require("script!../jslib/markdown/Markdown.Converter.js");
require("script!../jslib/markdown/Markdown.Sanitizer.js");
require("script!../jslib/codemirror-3.20/lib/codemirror.js");
require("script!../jslib/codemirror-3.20/addon/runmode/runmode.js");
require("script!../jslib/codemirror-3.20/addon/runmode/colorize.js");
require("script!../jslib/codemirror-3.20/mode/clojure/clojure.js");
require("script!../jslib/jquery/jquery-1.10.2.min.js");
require("script!../jslib/underscore/underscore.min.js");
require("script!../jslib/knockoutjs/knockout-3.0.0.min.js");
require("script!../jslib/d3/d3.v3.min.js");
require("script!../jslib/d3/d3.geo.projection.min.js");
require("script!../jslib/vega/vega.1.3.3.min.js");
require("script!../jslib/uuid/uuid.core.js");

var _ = require('lodash');

var root = window;

root.utils = require("./utils.js");
_.merge(root, require("./renderer.js"));
_.merge(root, require("../js-viewer/segment-viewer.js"));

root.worksheet = require("../js-viewer/worksheet-viewer.js");
_.merge(root, require("../js-viewer/github.js"));
root.worksheetParser = require("./worksheetParser.js");

require("./mathJaxViewer.js");
require("./outputViewer.js");
require("../js-viewer/main-viewer.js");