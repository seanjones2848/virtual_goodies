{
    var overlay3d = Overlays.addOverlay("cube", {
        position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: 0, z: -3 })),
        rotation: MyAvatar.orientation,
        dimensions: { x: 0.3, y: 0.3, z: 0.3 },
        solid: true
    });
    print("3D overlay: " + overlay3d);

    var overlay2d = Overlays.addOverlay("rectangle", {
        bounds: { x: 100, y: 100, width: 200, height: 100 },
        color: { red: 255, green: 255, blue: 255 }
    });
    print("2D overlay2d: " + overlay2d);

    // Overlays.mousePressOnOverlay by default applies only to 3D overlays.
    Overlays.mousePressOnOverlay.connect(function(overlayID, event) {
        print("Clicked: " + overlayID);
    });

    Controller.mousePressEvent.connect(function (event) {
        // Overlays.getOverlayAtPoint applies only to 2D overlays.
        var overlay = Overlays.getOverlayAtPoint({ x: event.x, y: event.y });
        if (overlay) {
            Overlays.sendMousePressOnOverlay(overlay, {
                type: "press",
                id: 0,
                pos2D: event
            });
        }
    });
    
    Script.scriptEnding.connect(function() {
        Overlays.deleteOverlay(overlay2d);
        Overlays.deleteOverlay(overlay3d);
    });
}