(function() {
    //Script.include("../../../developer/libraries/utils.js");
    var _this;
    var TRIGGER_CONTROLS = [
        Controller.Standard.LT,
        Controller.Standard.RT,
    ];
    var triggerState = false;
    var TIMESCALE = 0.03;
    var ACTION_TTL = 10;    

    MagicWand = function() {
        _this = this;
        _this.launchSound = SoundCache.getSound("https://s3-us-west-1.amazonaws.com/hifi-content/eric/Sounds/missle+launch.wav");
        _this.explosionSound = SoundCache.getSound("https://s3-us-west-1.amazonaws.com/hifi-content/eric/Sounds/fireworksExplosion.wav");
        _this.TIME_TO_EXPLODE = 3000;
    };

    function triggerPulled(hand) {
        var triggerValue = Controller.getValue(TRIGGER_CONTROLS[hand]);
        var oldTriggerState = triggerState;
        var TRIGGER_PULL_THRESHOLD = 0.5;
        var TRIGGER_RELEASE_THRESHOLD = 0.4;
        if (triggerValue > TRIGGER_PULL_THRESHOLD) {
            triggerState = true;
        } else if (triggerValue < TRIGGER_RELEASE_THRESHOLD) {
            triggerState = false;
        }
        return (triggerState && (oldTriggerState != triggerState));
    };

    function updateSpringAction(timescale) {
        var targetProps = SVGElementInstanceList.getEntityProperties(_this.entityID);
        var props = {
            targetPosition: targetProps.position,
            targetRotation: targetProps.rotation,
            linearTimeScale: timescale,
            angularTimeScale: timescale,
            ttl: ACTION_TTL
        };
        Entities.updateAction(_this.copy, _this.actionID, props);
    };

    function createSpringAction(timescale) {
        var targetProps = SVGElementInstanceList.getEntityProperties(_this.entityID);
        var props = {
            targetPosition: targetProps.position,
            targetRotation: targetProps.rotation,
            linearTimeScale: timescale,
            angularTimeScale: timescale,
            ttl: ACTION_TTL
        };
        _this.actionID = Entities.addAction("spring", _this.copy, props);
    };

    function createCopy() {
        var origionalProps = Entities.getEntityProperties(_this.entityID);
        var props = {
            type: origionalProps.type,
            color: origionalProps.color,
            dimentions: origionalProps.dimentions,
            dynamic: true,
            damping: 0.0,
            angularDamping: 0.0,
            collidesWith: 'dynamic,static,kinematic',
            rotation: origionalProps.rotation,
            position: origionalProps.position,
            shapeType: origionalProps.shapeType,
            visible: true,
            userdata: JSON.stringify({
                grabbableKey: {
                    grabable: true
                }
            })
        };
        _this.copy = Entities.addEntity(props);
    };

    function deleteCopy() {
        Entities.deleteEntity(_this.copy);
    };

    function makeOrigionalInvisible() {
        Entities.editEntity(_this.entityID, {
            visible: false,
            collisionless: true
        })
    };

    function makeOrigionalVisible() {
        Entities.editEntity(_this.entityID, {
            visible: true,
            collisionless: false
        })
    };

    function deleteSpringAction() {
        Entities.deleteAction(this.copy, this.actionID);
    };

    function shootFire(launchPosition) {
        Audio.playSound(_this.launchSound, {
            position: launchPosition,
            volume: 0.5
        });
        var smoke = Entities.addEntity({
            type: "ParticleEffect",
            position: _this.position,
            velocity: vec3.sum(MyAvatar.position, Vec3.multiply(3, Quat.getForward(Camera.getOrientation()))),
            lifespan: 5,
            lifetime: 10,
            isEmmiting: true,
            name: "Smoke Trail",
            maxParticles: 2000,
            emitRate: 80,
            emitSpeed: 0,
            speedSpread: 0,
            polarStart: 0,
            polarFinish: 0,
            azimuthStart: -Math.PI,
            azimuthFinish: Math.PI,
            emitAcceleration: {
                x: 0,
                y: 0.01,
                z: 0
            },
            accelerationSpread: {
                x: 0.01,
                y: 0,
                z: 0.01
            },
            radiusSpread: 0.03,
            particleRadius: 0.1,
            radiusStart: 0.02,
            radiusFinish: 0.1,
            alpha: 0.1,
            alphaSpread: 0,
            alphaStart: 0.7,
            alphaFinish: 0,
            textures: "https://hifi-public.s3.amazonaws.com/alan/Particles/Particle-Sprite-Smoke-1.png",
            emitterShouldTrail: true,
        });
        Script.setTimeout(function() {
            var explodePosition = Entities.getEntityProperties(smoke, "position").position;
            explodeFire(explodePosition);
        }, _this.TIME_TO_EXPLODE);
    };

    function explodeFire(explodePosition) {
        Audio.playSound(_this.explosionSound, {
            position: explodePosition
        });
        var firework = Entities.addEntity({
            name: "fireworks emitter",
            position: explodePosition,
            type: "ParticleEffect",
            colorStart: hslToRgb({
                h: Math.random(),
                s: 0.5,
                l: 0.7
            }),
            color: hslToRgb({
               h: Math.random(),
               s: 0.5,
               l: 0.5
           }),
           colorFinish: hslToRgb({
               h: Math.random(),
               s: 0.5,
               l: 0.7
           }),
           maxParticles: 10000,
           lifetime: 20,
           lifespan: randFloat(1.5, 3),
           emitRate: randInt(500, 5000),
           emitSpeed: randFloat(0.5, 2),
           speedSpread: 0.2,
           emitOrientation: Quat.fromPitchYawRollDegrees(randInt(0, 360), randInt(0, 360), randInt(0, 360)),
           polarStart: 1,
           polarFinish: randFloat(1.2, 3),
           azimuthStart: -Math.PI,
           azimuthFinish: Math.PI,
           emitAcceleration: {
               x: 0,
               y: randFloat(-1, -0.2),
               z: 0
           },
           accelerationSpread: {
               x: Math.random(),
               y: 0,
               z: Math.random()
           },
           particleRadius: randFloat(0.001, 0.1),
           radiusSpread: Math.random() * 0.1,
           radiusStart: randFloat(0.001, 0.1),
           radiusFinish: randFloat(0.001, 0.1),
           alpha: randFloat(0.8, 1.0),
           alphaSpread: randFloat(0.1, 0.2),
           alphaStart: randFloat(0.7, 1.0),
           alphaFinish: randFloat(0.7, 1.0),
           textures: "http://ericrius1.github.io/PlatosCave/assets/star.png",
        });

        Script.setTimeout(function() {
            Entities.editEntity(firework, {
                isEmitting: false
            });
        }, 1000);
   };

    this.continueEquip = function(id, params) {
        var hand = params[0] == "left" ? 0 : 1;
        if(triggerPulled(hand)) {
            shootFire(_this.position)
        }
    };

    MagicWand.prototype = {
        preload: function(entityID) {
            _this.entityID = entityID;
        },
        startNearGrab: function(entityID, data) {
            createCopy();
            createSpringAction(TIMESCALE);
            makeOrigionalInvisible();
        },
        continueNearGrab: function() {
            updateSpringAction();
        },
        releaseGrab: function() {
            deleteSpringAction();
            deleteCopy();
            makeOrigionalVisible();
        },
    };

    return new MagicWand;
})