require("script!../jslib/markdown/Markdown.Converter.js");
require("script!../jslib/markdown/Markdown.Sanitizer.js");
require("script!../jslib/jquery/jquery-1.10.2.min.js");
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

window.$ = window.jQuery = require('jquery');

require("./mathJaxViewer");
require("./outputViewer");
require("./main");