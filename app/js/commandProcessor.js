/*
 * This file is part of gorilla-repl. Copyright (C) 2014-, Jony Hudson.
 *
 * gorilla-repl is licenced to you under the MIT licence. See the file LICENCE.txt for full details.
 */

// Listens for "command:*" events and processes them, usually by firing off new events that are handled by the
// appropriate component.

module.exports = (function () {
    var _ = require('lodash');
    var eventBus = require('./eventBus');
    var commandList = require('./commandList').commandList;
    var self = {};

    // ** Patch Mousetrap **
    // Install a custom stopCallback so that our keyboard shortcuts work in the codeMirror textareas.
    // This also lets us disable mousetrap processing when we show dialogs (this idea shamelessly stolen from the
    // Mousetrap 'pause' plugin).
    Mousetrap.enabled = true;
    Mousetrap.enable = function (enabled) {Mousetrap.enabled = enabled;};
    Mousetrap.stopCallback = function () {
        return !Mousetrap.enabled;
    };

    var addCommand = function (command) {
        eventBus.on(command.name, command.action);
        if (command.kb) Mousetrap.bind(command.kb, function () {
            eventBus.trigger(command.name);
            return false;
        });
    };

    self.installCommands = function (keymapOverrides) {
        if (keymapOverrides) {
            _.keys(keymapOverrides).forEach(function (k) {
                commandList.forEach(function (c) {
                    if (c.name === k) c.kb = keymapOverrides[k];
                })
            });
        }
        commandList.forEach(addCommand);
    };

    return self;

})();
