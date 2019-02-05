(function() {
    var _this;
    var _speed = 2;
    var _followRadius = 5.0;
    var _idleTimer = 0;
    var _hundreth = 0.01;
    var _thousand = 1000;
    var _lastSecond = Date.now();
    var _action = false;

    function Pet() {
        _this = this;
    }

    Pet.prototype = {
        preload: function(entityID) {
            print("Happy to be here! :3");
            _this.entityID = entityID;
            _this.parent = MyAvatar.SELF_ID;
            Script.update.connect(this.update);
        },
        update: function(dt) {
            if (Date.now() / _thousand !== _lastSecond / _thousand) {
                var props = Entities.getEntityProperties(_this.entityID, ["position", "velocity", "angularVelocity"]);
                var petToAvatarDist = Vec3.distance(MyAvatar.position, props.position);
                var petToAvatarDir = Vec3.subtract(MyAvatar.position, props.position);
                if (petToAvatarDist > _followRadius) {
                    Entities.editEntity(_this.entityID, {
                        velocity: Vec3.multiply((petToAvatarDist - _followRadius + _speed), petToAvatarDir)
                    });
                    print("Coming back!!!");
                }
                if (Vec3.length(props.velocity) <= _hundreth && Vec3.length(props.angularVelocity) <= _hundreth) {
                    var rotate = {
                        x: randFloat(-2, 2),
                        y: randFloat(-2, 2),
                        z: randFloat(-2, 2)
                    };
                    Entities.editEntity(_this.entityID, {
                        angularVelocity: rotate
                    });
                    print("Idle rotation");
                }
                _lastSecond = Date.now();
            }
        },
        unload: function() {
            Script.update.disconnect(this.follow);
            print("Bye fren! :'3");
        }
    };

    return new Pet;
});