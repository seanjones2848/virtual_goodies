(function() {
    var RUNNING_SCRIPTS_KEY = 'RunningScripts';
    var CONTROLLER_SCRIPT_LOCATION = 'file:///~//system/controllers/controllerScripts.js';
    var isActive = true;
    var previouslyRunningScripts;
    var ScriptManager = function() {
    };
    ScriptManager.prototype = {
        preload: function(entityID) {
            if (isActive) {
                previouslyRunningScripts = Settings.getValue(RUNNING_SCRIPTS_KEY);
                ScriptDiscoveryService.stopAllScripts();
                ScriptDiscoveryService.loadOneScript(CONTROLLER_SCRIPT_LOCATION);
            }
        },
        unload: function() {
            if (isActive) {
                Settings.setValue(RUNNING_SCRIPTS_KEY, previouslyRunningScripts);
                previouslyRunningScripts.forEach(function(script) {
                    ScriptDiscoveryService.loadOneScript(script);
                });
            }
        }
    };
    return new ScriptManager();
});