(function(){

    var url;
    var tablet;

    var EventbriteButton = function() {

    };
    
    EventbriteButton.prototype = {

        preload : function(entityID) {
            url = JSON.parse(Entities.getEntityProperties(entityID, 'userData').userData).url;
            tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
        },

        clickDownOnEntity : function() {
            tablet.gotoWebScreen(url);
        },

        startNearTrigger: function() {
            tablet.gotoWebScreen(url);
        },

        startFarTrigger: function() {
            tablet.gotoWebScreen(url);
        }

    };

    return new EventbriteButton();

});