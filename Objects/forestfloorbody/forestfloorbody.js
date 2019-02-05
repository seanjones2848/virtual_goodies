var b = Entities.addEntity({
    parentID: MyAvatar.sessionUUID,
    name: "_forestfloormat",
    type: "Material",
    materialURL: "https://hifi-content.s3.amazonaws.com/sean/forestfloorbody/forestfloormat.json", 
    parentMaterialName: "1", 
    priority: 1, 
    position: MyAvatar.position}, 
true);
var t = 0;
Script.update.connect(function(dt) {
    if (t % 100 === 0) {
        Entities.editEntity(b, {
            materialMappingPos: {
                x: t*0.001, 
                y: t*0.001
            }, 
            materialMappingScale: {
                x: 0.1, 
                y: 0.1
            }
        });
    }
    t = t + dt;
});