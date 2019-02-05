(function() {
    var _this;
    var _consent = false;
    var _showing = false;
    var _consentOverlay = null;
    var _yesOverlay = null;
    var _noOverlay = null;

    function PermissionZone() {
        _this = this;
        return;
    }

    function resize(dt) {
        if (_showing) {
            Overlays.editOverlay(_consentOverlay, {
                position: Vec3.sum(Camera.position, Vec3.multiplyQbyV(Camera.orientation, { x: 0, y: 0, z: -1 })),
                rotation: Camera.orientation
            });
        }
    }

    PermissionZone.prototype = {
        preload: function(entityID) {
            _this.entityID = entityID;
            print("consentZone loaded in!");
        },
        makeOverlay: function() {
            if (_consentOverlay === null) {
                var position = Vec3.sum(Camera.position, Vec3.multiplyQbyV(Camera.orientation, { x: 0, y: 0, z: -1 }));
                _consentOverlay = Overlays.addOverlay(
                    "text3d", {
                        name: "serverConsent",
                        text: "Do you consent to the\ncontent in this domain?",
                        isFacingAvatar: true,
                        lineHeight: 0.075,
                        leftMargin: 5.05,
                        rightMargin: 5.05,
                        topMargin: 5.05,
                        bottomMargin: 5.25,
                        parentID: MyAvatar.sessionUUID,
                        position: position,
                        rotation: Camera.orientation,
                        color: {
                            red: 255,
                            green: 255,
                            blue: 255
                        },
                        backgroundColor: {
                            red: 50,
                            green: 50,
                            blue: 50
                        },
                        dimensions: {
                            x: 10.8,
                            y: 10.5
                        },
                        alpha: 1,
                        visible: true
                    });
                _yesOverlay = Overlays.addOverlay(
                    "text3d", {
                        name: "yesConsent",
                        text: "YES",
                        isFacingAvatar: true,
                        lineHeight: 0.1,
                        leftMargin: 0.02,
                        rightMargin: 0.02,
                        topMargin: 0.02,
                        bottomMargin: 0.02,
                        parentID: _consentOverlay,
                        position: Vec3.sum(position, Vec3.multiplyQbyV(Camera.orientation, { x: -0.16, y: -0.1, z: 0 })),
                        rotation: Camera.osrientation,
                        color: {
                            red: 255,
                            green: 255,
                            blue: 255
                        },
                        backgroundColor: {
                            red: 50,
                            green: 50,
                            blue: 50
                        },
                        dimensions: {
                            x: 0.2,
                            y: 0.14
                        },
                        alpha: 0.7,
                        visible: true,
                        drawInFront: true
                    });
                _noOverlay = Overlays.addOverlay(
                    "text3d", {
                        name: "noConsent",
                        text: "NO",
                        isFacingAvatar: true,
                        lineHeight: 0.1,
                        leftMargin: 0.02,
                        rightMargin: 0.02,
                        topMargin: 0.02,
                        bottomMargin: 0.02,
                        parentID: _consentOverlay,
                        position: Vec3.sum(position, Vec3.multiplyQbyV(Camera.orientation, { x: 0.14, y: -0.1, z: 0 })),
                        rotation: Camera.orientation,
                        color: {
                            red: 255,
                            green: 255,
                            blue: 255
                        },
                        backgroundColor: {
                            red: 50,
                            green: 50,
                            blue: 50
                        },
                        dimensions: {
                            x: 0.2,
                            y: 0.14
                        },
                        alpha: 0.7,
                        visible: true,
                        drawInFront: true
                    });
            }
            print("made overlay");
            Script.update.connect(resize);
        },
        destroyOverlays: function() {
            Script.update.disconnect(resize);
            Overlays.deleteOverlay(_consentOverlay);
            Overlays.deleteOverlay(_yesOverlay);
            Overlays.deleteOverlay(_noOverlay);
            _consentOverlay = null;
            _yesOverlay = null;
            _noOverlay = null;
            _showing = false;
            print("consentZone gone now!");
        },
        enterEntity: function() {
            print("This avatar entered: " + JSON.stringify(MyAvatar.SELF_ID));
            if (_consent === false && _showing === false) {
                this.makeOverlay();
                _showing = true;
            }
        },
        leaveEntity: function() {
            if (_consentOverlay !== null) {
                this.destroyOverlays();
            }
        },
        deletingEntity: function() {
            if (_consentOverlay !== null) {
                this.destroyOverlays();
            }
        },
        unload: function() {
            if (_consentOverlay !== null) {
                this.destroyOverlays();
            }
        }
    };
    Overlays.mousePressOnOverlay.connect(function(overlayID, event) {
        print("mouse pressed on: " + overlayID + " with event: " + JSON.stringify(event));
        if (overlayID === _yesOverlay) {
            print("consent given");
            _this.destroyOverlays();
            Entities.deleteEntity(_this.entityID);
            _consent = true;
        }
        if (overlayID === _noOverlay) {
            print("consent not given");
            _this.destroyOverlays();
            // if no consent given, go back from whence you came
            // location.goToEntry(1);
        }
    });
    return new PermissionZone();
});