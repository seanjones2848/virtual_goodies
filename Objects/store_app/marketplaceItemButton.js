(function() {

    var url;
    var tablet;
    var MARKETPLACE_INJECT_SCRIPT = ScriptDiscoveryService.defaultScriptsPath + "/system/html/js/marketplacesInject.js";
    var EventbriteButton = function() {

    };
    
    EventbriteButton.prototype = {

        preload : function(entityID) {
            url = JSON.parse(Entities.getEntityProperties(entityID, 'userData').userData).url;
            tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
        },

        clickDownOnEntity : function() {
            tablet.gotoWebScreen(url, MARKETPLACE_INJECT_SCRIPT);
        },

        startNearTrigger: function() {
            tablet.gotoWebScreen(url, MARKETPLACE_INJECT_SCRIPT);
        },

        startFarTrigger: function() {
            tablet.gotoWebScreen(url, MARKETPLACE_INJECT_SCRIPT);
        }

    };

    return new EventbriteButton();

});