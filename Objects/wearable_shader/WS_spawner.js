var SHADER_URL = Script.resolvePath("fractalLinesOfSymmetry.glsl");

var WS = Entities.addEntity({
    type: "Shape",
    name: "wearable-shader",
    shape: "Cylinder",
    dynamic: true,
    dimensions: {
        x: 0.05,
        y: 0.05,
        z: 0.05
    },
    parentID: MyAvatar.SELF_ID,
    parentJointIndex: 92,
    parentJointName: "HeadTop_End",
    userData: JSON.stringify({
        grabbableKey: {
            grabbable: true,
            cloneable: false
        },
        Attachment: {
            action: "attach",
            joint: "HeadTop_End",
            attached: false,
            options: {
                translation: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                scale: 1
            }
        },
        ProceduralEntity: {
            shaderUrl: SHADER_URL,
            version: 2,
            uniforms: {
                timeScale: 0.1
            }
        }
    })
});
function cleanup() {
    Entities.deleteEntity(WS);
}

Script.scriptEnding.connect(cleanup);