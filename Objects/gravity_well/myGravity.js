(function() {

    var oldOrientation;
    var newDirection;
    var entity;
    
    var Gravity = function() {};

    Gravity.prototype = {

        preload: function(entityID) {
            entity = entityID;
        },

        changeGrav: function() {
            newDirection = JSON.parse(Entities.getEntityProperties(entity, 'userData').userData).direction;
            oldOrientation = MyAvatar.orientation;            
            MyAvatar.orientation = ;
        },

        clickDownOnEntity: function() {
            this.changeGrav();
        },

        startNearTrigger: function() {
            this.changeGrav();
        },

        startFarTrigger: function() {
            this.changeGrav();
        }

    };

    return new Gravity();

});