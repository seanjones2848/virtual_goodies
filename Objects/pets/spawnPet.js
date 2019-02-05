{
    var orientation = Camera.getOrientation();
    orientation = Quat.safeEulerAngles(orientation);
    orientation.x = 0;
    orientation = Quat.fromVec3Degrees(orientation);
    var distAway = 3;
    var center = Vec3.sum(MyAvatar.position, Vec3.multiply(distAway, Quat.getFront(orientation)));
    var SCRIPT_URL = Script.resolvePath("petScript.js" + "?" + Date.now());
    var SHADER_URL = "https://gist.githubusercontent.com/hyperlogic/4bd34d28113502049b34c120d0131fd3/raw/4ab021cf3d71f40acf734a8353a73e4c717ada29/fractal_lines_of_symmetry.glsl";
    var pet = Entities.addEntity({
        type: "Shape",
        shape: "Icosahedron",
        name: "Sean's pet",
        position: center,
        damping: 0.9,
        angularDamping: 0.1,
        gravity: {
            x: 0,
            y: 0,
            z: 0
        },
        dimensions: {
            x: 0.2,
            y: 0.2,
            z: 0.2
        },
        script: SCRIPT_URL,
        userData: JSON.stringify({
            grabbableKey: {
                grabbable: true
            },
            ProceduralEntity: {
                shaderUrl: SHADER_URL,
                version: 2,
                uniforms: {}
            }
        }),
        dynamic: true,
        clientOnly: true,
        prentID: MyAvatar.SELF_ID,
        parentJointIndex: -1
    });
    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(pet);
    });
}