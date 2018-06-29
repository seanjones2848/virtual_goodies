var center = Vec3.sum(Vec3.sum(MyAvatar.position, {
    x: 0,
    y: 0.5,
    z: 0
}), Vec3.multiply(2, Quat.getForward(Camera.getOrientation())));

var SCRIPT_URL = Script.resolvePath("magicWandEntityScript.js");
var MODEL_URL = Script.resolvePath("magic_wand.fbx");
var magicWand = Entities.addEntity({
    type: "Model",
    name: "magic-wand",
    modelURL: MODEL_URL,
    position: center,
    dimentions: {
        x: 1.0,
        y: 1.0,
        z: 1.0
    },
    gravity: {
        x: 0,
        y: -9.8,
        z: 0
    },
    script: SCRIPT_URL,
    dynamic: true,
    userData: JSON.stringify({
        grabbableKey: {
            grabbable: true,
            invertSolidWhileHeld: true,
            wantsTrigger: true
        },
        wearable: {
            joints: {
                RightHand: [{
                  x: 0.1177130937576294,
                  y: 0.12922893464565277,
                  z: 0.08307232707738876
                }, {
                  x: 0.4934672713279724,
                  y: 0.3605862259864807,
                  z: 0.6394805908203125,
                  w: -0.4664038419723511
                }],
                LeftHand: [{
                  x: 0.09151676297187805,
                  y: 0.13639454543590546,
                  z: 0.09354984760284424
                }, {
                  x: -0.19628101587295532,
                  y: 0.6418180465698242,
                  z: 0.2830369472503662,
                  w: 0.6851521730422974
                }]
            }
        }
    })
});
function cleanup() {
    Entities.deleteEntity(magicWand);
}

Script.scriptEnding.connect(cleanup);