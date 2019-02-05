var center = Vec3.sum(Vec3.sum(MyAvatar.position, {
    x: 0,
    y: 0.5,
    z: 0
}), Vec3.multiply(2, Quat.getForward(Camera.getOrientation())));

Script.require.cache[Script.require.resolve('./myGravity.js')] = undefined;
var SCRIPT_URL = Script.resolvePath("myGravity.js");

var gravCube = Entities.addEntity({
    type: "Box",
    name: "gravCube",
    position: center,
    script: SCRIPT_URL,
    userData: JSON.stringify({
        direction: {
            x: 0,
            y: 0,
            z: 0
        }
    })
});

function cleanup() {
    Entities.deleteEntity(gravCube);
}

Script.scriptEnding.connect(cleanup);