var center = Vec3.sum(Vec3.sum(MyAvatar.position, {
    x: 0,
    y: 0.5,
    z: 0
}), Vec3.multiply(2, Quat.getForward(Camera.getOrientation())));

var SCRIPT_URL = Script.resolvePath("magicWandEntityScript.js");
var MODEL_URL = Script.resolvePath("magic_wand.fbx");
var COMPOUND_URL = Script.resolvePath("magic_wand.obj");
var pitch = 60;
var yaw = 90;
var rightHandRotation = Quat.fromPitchYawRollDegrees(pitch, yaw, 0);
var leftHandRotation = Quat.fromPitchYawRollDegrees(-pitch, yaw, 0);

var magicWand = Entities.addEntity({
    type: "Model",
    name: "magic-wand",
    modelURL: MODEL_URL,
    compoundShapeURL: COMPOUND_URL,
    position: center,
    shapeType: "compound",
    dynamic: true,
    collisionsWillMove: true,
    collisionMask: 31,
    dimensions: {
        x: 0.018,
        y: 0.33,
        z: 0.018
    },
    gravity: {
        x: 0,
        y: -9.8,
        z: 0
    },
    velocity: {
        x: 0,
        y: 0.1,
        z: 0
    },
    script: SCRIPT_URL,
    userData: JSON.stringify({
        grabbableKey: {
            grabbable: true,
            invertSolidWhileHeld: true,
            wantsTrigger: true
        },
        wearable: {
            joints: {
                RightHand: [{
                    x: 0.1,
                    y: 0.15,
                    z: 0.02
                }, rightHandRotation
                ],
                LeftHand: [{
                    x: -0.1,
                    y: 0.15,
                    z: 0.02
                }, leftHandRotation 
                ]
            }
        }
    })
});
function cleanup() {
    Entities.deleteEntity(magicWand);
}

Script.scriptEnding.connect(cleanup);