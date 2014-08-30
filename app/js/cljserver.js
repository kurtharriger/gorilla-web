
var cljserver = (function () {
  var loc = window.location;
  var server = (loc.search.match(/server=([^&]*)/) || "").slice(1);
  if(server) {
    return server[0];
  } else {
    // if not specified assume running on current port + 1
    return loc.protocol + "//" + loc.hostname + ":" + (parseInt(loc.port) + 1);
  }
})();