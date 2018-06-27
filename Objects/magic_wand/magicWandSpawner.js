var orientation = Camera.getOrientation();
orientation = Quat.safeEulerAngles(orientation);
orientation.x = 0;
orientation = Quat.fromVec3Degrees(orientation);
var center = Vec3.sum(MyAvatar.position, Vec3.multiply(3, Quat.getFront(orientation)));

var SCRIPT_URL = Script.resolvePath("magicWandEntityScript.js");
var MODEL_URL = Script.resolvePath("https://rawgit.com/seanjones2848/virtual_goodies/master/Objects/magic_wand/magic_wand.fbx");
var magicWand = Entities.addEntity({
    type: "Model",
    name: "magic-wand",
    position: center,
    dimentions: {
        x: 1.0,
        y: 1.0,
        z: 1.0
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