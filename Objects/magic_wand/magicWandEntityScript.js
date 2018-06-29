(function() {
    Script.include("../../../developer/libraries/utils.js");
    print("we in the scripty!!!")
    var _this;
    var TRIGGER_CONTROLS = [
        Controller.Standard.LT,
        Controller.Standard.RT,
    ];
    var triggerState = false;
    var launchSound = SoundCache.getSound("https://s3-us-west-1.amazonaws.com/hifi-content/eric/Sounds/missle+launch.wav");
    var explosionSound = SoundCache.getSound("https://s3-us-west-1.amazonaws.com/hifi-content/eric/Sounds/fireworksExplosion.wav");
    var TIME_TO_EXPLODE = 3000;
    var RELOAD_THRESHOLD = 0.9;
    var FIREBALL_FORCE = 10;
    var WAND_TIP_OFFSET = 0.16;
    
    function MagicWand() {
        _this = this;
        return;
    };

    MagicWand.prototype = {
        hand: null,
        canFire: false,
        canFireTimeout: null,

        preload: function(entityID) {
            this.entityID = entityID;
            this.launchSound = launchSound;
            this.explosionSound = explosionSound;
            //this.createTipEntity(entityID);
        },
        createTipEntity: function(entityID) {
            //for debugging where the tip is
            var wandProps = Entities.getEntityProperties(this.entityID, ["position", "rotation"]);

            var tip = Entities.addEntity({
                name: "WandTip",
                dimensions: {
                    x: 0.02,
                    y: 0.02,
                    z: 0.02
                },
                color: {
                    red: 255,
                    blue: 0,
                    green: 0
                },
                type: "Box",
                parentID: entityID,
                position: this.getWandTipPosition(wandProps),
            });
        },
        getWandTipPosition: function(wandProps) {
            var Offset = Vec3.multiply(Quat.getUp(wandProps.rotation), WAND_TIP_OFFSET);
            var WandTipPosition = Vec3.sum(wandProps.position, Offset);
            return WandTipPosition;
        },
        startEquip: function(entityID, args) {
            print("beginning to equip");
            this.hand = args[0] == "left" ? 0 : 1;
        },
        continueEquip: function(entityID, args) {
            if (this.canFireTimeout !== null) {
                Script.clearTimeout(this.canFireTimeout);
            }
            this.checkTriggerPressure(this.hand);
        },
        releaseEquip: function(entityID, args) {
            print("let go");
            var _this = this;
            this.canFireTimeout = Script.setTimeout(function() {
                _this.canFire = false;
            }, 250);
        },
        checkTriggerPressure: function(hand) {
            this.triggerValue = Controller.getValue(TRIGGER_CONTROLS[hand]);
            if (this.triggerValue < RELOAD_THRESHOLD) {
                this.canFire = true;
            } else if (this.triggerValue >= RELOAD_THRESHOLD && this.canFire === true) {
                var wandProps = Entities.getEntityProperties(this.entityID, ["position", "rotation"]);
                print("firing");
                this.shootFire(wandProps);
                this.canFire = false;
            }
            return (triggerState && (oldTriggerState != triggerState));
        },
        explode: function(explodePosition) {
            print("wand: exploding");
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
        },
        shootFire: function(wandProps) {
            print("wand: shooting the fireball");
            var forwardVec = Quat.getForward(Quat.multiply(wandProps.rotation, Quat.fromPitchYawRollDegrees(0, 180, 0)))
            forwardVec = Vec3.multiply(Vec3.normalize(forwardVec), FIREBALL_FORCE);
            Audio.playSound(_this.launchSound, {
                position: wandProps.position,
                volume: 0.5
            });
            var fireball = Entities.addEntity({
                name: "fireball",
                shapeType: "sphere",
                type: "Sphere",
                color: {
                    red: 255,
                    green: 0,
                    blue: 0
                },
                dimensions: {
                    x: 0.05,
                    y: 0.05,
                    z: 0.05
                },
                damping: 0.4,
                //gravity: {
                //    x: 0,
                //    y: -4.8,
                //    z: 0
                //},
                restitution: 0.6,
                dynamic: true,
                rotation: wandProps.rotation,
                position: this.getWandTipPosition(wandProps),
                velocity: forwardVec,
                lifetime: 10
            });
            var smoke = Entities.addEntity({
                type: "ParticleEffect",
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
                parent: fireball,
            });
            Script.setTimeout(function() {
                var explodePosition = Entities.getEntityProperties(fireball, "position").position;
                _this.explode(explodePosition);
            }, TIME_TO_EXPLODE);
        },      
    };
    return new MagicWand();
});