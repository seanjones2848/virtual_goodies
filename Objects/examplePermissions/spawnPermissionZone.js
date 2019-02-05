{
    var SCRIPT_NAME = "permissionZone.js" + "?" + Date.now();
    var SCRIPT_URL = Script.resolvePath(SCRIPT_NAME);
    print(SCRIPT_NAME);
    var consentZone = Entities.addEntity({
        type: "Zone",
        name: "consentZone",
        dimensions: {
            x: 5,
            y: 5,
            z: 5
        },
        flyingAllowed: "false",
        hazeMode: "enabled",
        haze: {
            hazeColor: {
                red: 0,
                green: 0,
                blue: 0
            },
            hazeRange: 1 
        },
        script: SCRIPT_URL
    });
    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(consentZone);
        print("despawned consentZone");
    });
}