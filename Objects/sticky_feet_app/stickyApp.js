(function() {
    var toggle = false;
    var APP_NAME = "STICKY";
    var APP_HTML = Script.resolvePath("stickyApp.html");
    var APP_ICON = Script.resolvePath("noun_shoe_white.svg");
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var stickyBox;
    var RADIUS_OF_DETECTION = 500;
    var spotBetweenFeet = function() {
        var right = MyAvatar.getJointPosition("RightFoot");
        var left = MyAvatar.getJointPosition("LeftFoot");
        var spot = Vec3.multiply(Vec3.sum(right, left), 0.5);
        print("spot between feet: ", JSON.stringify(spot));
        return spot;
    };
    var makeStickyBox = function(location, entity) {
        var boxID = Entities.addEntity({
            type: "Box",
            name: "stickyBox",
            position: location,
            dimensions: {
                x: 0.2,
                y: 0.02,
                z: 0.2
            },
            color: {
                red: 255,
                green: 0,
                blue: 0
            },
            visible: true, // turn to false as soon as it works
            gravity: {
                x: 0,
                y: 0,
                z: 0
            },
            damping: 0,
            parentID: entity
        });
        print("created stickyBox: ", stickyBox);
        return boxID;
    };
    var button = tablet.addButton({
        text: APP_NAME,
        icon: APP_ICON
    });
    function onClicked() {
        tablet.gotoWebScreen(APP_HTML);
    }
    function stickToSurface() {
        var closestEntity = Entities.findClosestEntity(spotBetweenFeet(), RADIUS_OF_DETECTION);
        stickyBox = makeStickyBox(spotBetweenFeet(), closestEntity);
        print("closestEntity: ", closestEntity);
        print("stickyBox: ", stickyBox);
        MyAvatar.setParentID(stickyBox);
    }
    function unstick() {
        MyAvatar.setParentID(Uuid.NULL);
        Entities.deleteEntity(stickyBox);
    }
    button.clicked.connect(onClicked);
    function onWebEventReceived(event) {
        print("stickyApp.js recieved a web event: " + event);
        if (typeof event === "string") {
            event = JSON.parse(event);
        }
        if (event.type === "ready") {
            var toggleState = {
                'toggle': toggle.toString()
            };
            tablet.emitScriptEvent(JSON.stringify(toggleState));
        }
        if (event.type === "toggle") {
            toggle = toggle === true ? false : true;
            if (toggle === true) {
                stickToSurface();
                print("toggled-on");
            } else {
                unstick();
                print("toggled-off");
            }
        }
    }
    tablet.webEventReceived.connect(onWebEventReceived);
    function cleanup() {
        tablet.removeButton(button);
        if (toggle) {
            unstick();
        }
    }
    Script.scriptEnding.connect(cleanup);
}());