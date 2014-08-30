// The application entry point
$(function () {
    var github = require('./github');
    var app = require('./app');

    var getParameterByName = function (name) {
      var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    var viewer = app();
    // how are we getting the worksheet data?
    var source = getParameterByName("source");
    switch (source) {
        case "github":
            var user = getParameterByName("user");
            var repo = getParameterByName("repo");
            var path = getParameterByName("path");
            github.getFromGithub(user, repo, path, function (data) {
                viewer.start(data, "https://github.com/" + user + "/" + repo, path, source);
            });
            return;
        case "gist":
            var id = getParameterByName("id");
            var filename = getParameterByName("filename");
          github.getFromGist(id, filename, function (data) {
                viewer.start(data,  "https://gist.github.com/" + id, filename, source);
            });
            return;
        case "test":
            // so you can test without exhausting the github API limit
            $.get('/test.clj').success(function (data) {
                viewer.start(data, "http://gorilla-repl.org/", "test.clj", source);
            });
    }
});