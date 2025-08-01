const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(),
  shouldAnimate: true
});

viewer.screenSpaceEventHandler.setInputAction((click) => {
  const cartesian = viewer.scene.camera.pickEllipsoid(click.position);
  if (!cartesian) return;
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
  const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
  const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);

  viewer.entities.removeAll();
  viewer.entities.add({
    position: cartesian,
    point: { pixelSize: 10, color: Cesium.Color.YELLOW },
    label: {
      text: `Lat: ${lat}, Lon: ${lon}`,
      font: "14px sans-serif",
      verticalOrigin: Cesium.VerticalOrigin.TOP
    }
  });

  console.log("Clicked location:", lat, lon);
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
