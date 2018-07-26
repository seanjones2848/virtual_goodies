var orientation = Camera.getOrientation();
orientation = Quat.safeEulerAngles(orientation);
orientation.x = 0;
orientation = Quat.fromVec3Degrees(orientation);
var distAway = 3;
var center = Vec3.sum(MyAvatar.position, Vec3.multiply(distAway, Quat.getFront(orientation)));
var SCRIPT_URL = Script.resolvePath("movingPlatEntity.js");

var movingPlat = Entities.addEntity({
    type: "Box",
    name: "moving-platform",
    position: center,
    dimensions: {
        x: 1,
        y: 0.02,
        z: 1
    },
    color: {
        red: 0,
        green: 0,
        blue: 0
    },
    gravity: {
        x: 0,
        y: 0,
        z: 0
    },
    velocity: {
        x: 2,
        y: 0,
        z: 0
    },
    damping: 0,
    script: SCRIPT_URL
});

function cleanup() {
    Entities.deleteEntity(movingPlat);
}

Script.scriptEnding.connect(cleanup);