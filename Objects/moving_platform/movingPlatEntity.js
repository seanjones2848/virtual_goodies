(function() {
    print("platform mover loaded");
    var _this;
    var back = false;
    var paused = false;
    var velocityBack = {
        x: 2,
        y: 0,
        z: 0
    };
    var velocityForth = {
        x: -2,
        y: 0,
        z: 0
    };
    var SEC_TO_MS = 1000;
    var TURN_AROUND_TIME_SEC = 5;
    var PAUSE_TIME_SEC = 10;
    var TURN_AROUND_TIME_MS = SEC_TO_MS * TURN_AROUND_TIME_SEC;
    var PAUSE_TIME_MS = SEC_TO_MS * PAUSE_TIME_SEC;
    function MovingPlatform() {
        _this = this;
        return;
    }
    var turnAroundTimeout = function() {
        Script.setTimeout(function() {
            // print("new timer set");
            paused = true;
            setVelocity();
        }, TURN_AROUND_TIME_MS);
    };
    var setVelocity = function() {
        // print("stopping");
        Entities.editEntity(_this.entityID, {
            velocity: {
                x: 0,
                y: 0,
                z: 0
            }
        });
        if (paused === true) {
            // print("paused");
            print("movingPlatID: ", _this.entityID);
            Script.setTimeout(function() {
                paused = false;
                setVelocity();
            }, PAUSE_TIME_MS);
        } else if (back === true) {
            // print("going back");
            Entities.editEntity(_this.entityID, {
                velocity: velocityBack
            });
            back = false;
            turnAroundTimeout();
        } else {
            // print("going forth");
            Entities.editEntity(_this.entityID, {
                velocity: velocityForth
            });
            back = true;
            turnAroundTimeout();
        }  
    };
    MovingPlatform.prototype = {
        preload: function(entityID) {
            _this.entityID = entityID;
            setVelocity();
        }
    };
    return new MovingPlatform();
});