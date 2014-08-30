
$(function() {

  var worksheetParser = require("imports?segment=./segment,utils=./utils!./worksheetParser");
  var repl = require('./repl-ws');
  var getParameterByName = function (name) {
    var match = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  };

  // start the REPL - the app is started in a callback from the repl connection that indicates we are
  // successfully connected.
  // TODO: a bit of historical weirdness that the REPL connection is made here, and not inside the app.start method
  repl.connect(
    function () {

      var gorilla = require("./app")(worksheetParser);
      var initialFilename = getParameterByName("filename");
      gorilla.start(initialFilename);
      // for debugging. Let's hope nobody else has defined a global variable called gorilla!
      window.gorilla = gorilla;
    },
    // this function is called if we failed to make a REPL connection. We can't really go any further.
    function () {
      alert("Failed to make initial connection to nREPL server. Refreshing the page might help.");
    });
});