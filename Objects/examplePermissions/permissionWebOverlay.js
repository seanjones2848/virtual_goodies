var web3dOverlay = Overlays.addOverlay("web3d", {
    position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, {x: 0, y: 0.5, z: -3 })),
    rotation: MyAvatar.orientation,
    url: Script.resolvePath("web3d.html"),
    alpha: 1.0
});

function onWebEventReceived(event) {
    print("onWebEventReceived() : " + JSON.stringify(event));
}

var overlayObject = Overlays.getOverlayObject(web3dOverlay);
overlayObject.webEventReceived.connect(onWebEventReceived);

Script.scriptEnding.connect(function () {
    Overlays.deleteOverlay(web3dOverlay);
});