(function() {
    var APP_NAME = "GEMSTONE";
    var APP_HTML = Script.resolvePath("app.html");
    var APP_ICON = "https://hifi-content.s3.amazonaws.com/faye/gemstoneMagicMaker/gemstoneAppIcon.svg";
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var button = tablet.addButton({
        text: APP_NAME,
        icon: APP_ICON
    });
    function onClicked() {
        tablet.gotoWebScreen(APP_HTML);
    }
    button.clicked.connect(onClicked);
    function onWebEventReceived(event) {
        print("gemstoneApp.js recieved a web event: " + event);
        if (typeof event === "string") {
            event = JSON.parse(event);
        }
        if (event.type === "click") {
            var props = {
                type: "Shape",
                position: getPositionToCreateEntity(),
                userData: JSON.stringify({
                    grabbableKey: {
                        grabbable: true
                    }
                })
            };
            if (event.data === "Emerald") {
                props.name = "Emerald";
                props.shape = "Dodecahedron";
                props.color = {
                    red: 16,
                    green: 179,
                    blue: 122 
                };
                props.dimensions = {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2
                };
            } else if (event.data === "Ruby") {
                props.name = "Ruby";
                props.shape = "Octagon";
                props.color = {
                    red: 237,
                    green: 52,
                    blue: 160 
                };
                props.dimensions = {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2
                };
            } else if (event.data === "Sapphire") {
                props.name = "Sapphire";
                props.shape = "Icosahedron";
                props.color = {
                    red: 102,
                    green: 115,
                    blue: 255 
                };
                props.dimensions = {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2
                };
            } else if (event.data === "Quartz") {
                props.name = "Quartz";
                props.shape = "Octahedron";
                props.color = {
                    red: 216,
                    green: 142,
                    blue: 245 
                };
                props.dimensions = {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2
                };    
            }
            Entities.addEntity(props);
        }
    }
    tablet.webEventReceived.connect(onWebEventReceived);
    function getPositionToCreateEntity() {
        var direction = Quat.getForward(MyAvatar.orientation);
        var distance = 0.3;
        var position = Vec3.sum(MyAvatar.position, Vec3.multiply(direction, distance));
        position.y += 0.5;
        return position;
    }
    function cleanup() {
        tablet.removeButton(button);
    }
    Script.scriptEnding.connect(cleanup);
}());