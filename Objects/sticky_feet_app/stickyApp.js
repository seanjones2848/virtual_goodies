(function() {
    var toggle = false;
    var APP_NAME = "STICKY";
    var APP_HTML = Script.resolvePath("stickyApp.html");
    var APP_ICON = Script.resolvePath("noun_shoe_white.svg");
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var button = tablet.addButton({
        text: APP_NAME,
        icon: APP_ICON
    });
    var shoes = Entities.addEntity({
        type: "Box",
        name: "sticky-shoes",
        collisionless: true,
        visible: false,
        dimensions: {
            x: 0.5,
            y: 0.01,
            z: 0.5
        },
        color: {
            red: 255,
            green: 255,
            blue: 0
        },
        userData: JSON.stringify({
            grabbableKey: {
                kinematic: false,
                cloneable: false
            },
            wearable: {
                joints: {
                    RightFoot: [{
                        x: 0,
                        y: 0,
                        z: 0
                    }, {
                        x: 0,
                        y: 0,
                        z: 0,
                        w: 0
                    }]
                }
            }
        })
    });
    function onClicked() {
        tablet.gotoWebScreen(APP_HTML);
    }
    button.clicked.connect(onClicked);
    function onWebEventReceived(event) {
        print("stickyApp.js recieved a web event: " + event);
        if (typeof event === "string") {
            event = JSON.parse(event);
        }
        if (event.type === "toggle") {
            toggle = toggle === true ? false : true;
            if (toggle === true) {
                print("toggled-on");
                Entities.editEntity(shoes, {
                    visible: true
                });
            } else {
                print("toggled-off");
                Entities.editEntity(shoes, {
                    visible: false
                });
            }
        }
    }
    tablet.webEventReceived.connect(onWebEventReceived);
    function cleanup() {
        tablet.removeButton(button);
    }
    Script.scriptEnding.connect(cleanup);
}());