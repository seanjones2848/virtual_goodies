var orientation = Camera.getOrientation();
orientation = Quat.safeEulerAngles(orientation);
orientation.x = 0;
orientation = Quat.fromVec3Degrees(orientation);
var center = Vec3.sum(MyAvatar.position, Vec3.multiply(3, Quat.getFront(orientation)));

var SCRIPT_URL = Script.resolvePath("magicWandEntityScript.js");
var magicWand = Entities.addEntity({
    type: "Shape",
    shape: "Cylinder",
    name: "magic-wand",
    position: center,
    color: {
        r: 255,
        g: 255,
        b: 255
    },
    dimentions: {
        x: 0.02,
        y: 0.2,
        z: 0.02
    },
    script: SCRIPT_URL,
    userdata: JSON.stringify({
        grabbableKey: {
            grabable: true
        }
    })
});

function cleanup() {
    Entities.deleteEntity(magicWand);
}

Script.scriptEnding.connect(cleanup);