Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YzkyNjFlNy1lY2JkLTRlMzMtOTIwNi02OTAxM2NmMWFlMDEiLCJpZCI6MzI3NjAwLCJpYXQiOjE3NTQwMDM5ODV9.eIlC7h0S8AQvHlZK9vd_AvQ_QMuARyFEKbEJRfQn4jk';

const viewer = new Cesium.Viewer('cesiumContainer', {
  terrain: Cesium.createWorldTerrain(),
  timeline: false,
  animation: false
});

// Optionally fly camera to a default position
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(0, 20, 20000000),
  orientation: {
    heading: Cesium.Math.toRadians(0),
    pitch: Cesium.Math.toRadians(-30),
    roll: 0
  }
});

viewer.screenSpaceEventHandler.setInputAction((click) => {
  const ellipsoidPoint = viewer.scene.camera.pickEllipsoid(click.position);
  if (!ellipsoidPoint) return;
  const carto = Cesium.Cartographic.fromCartesian(ellipsoidPoint);
  const lat = Cesium.Math.toDegrees(carto.latitude).toFixed(6);
  const lon = Cesium.Math.toDegrees(carto.longitude).toFixed(6);

  viewer.entities.removeAll();
  viewer.entities.add({
    position: ellipsoidPoint,
    point: { pixelSize: 10, color: Cesium.Color.YELLOW },
    label: {
      text: `Lat: ${lat}, Lon: ${lon}`,
      font: "14px sans-serif",
      verticalOrigin: Cesium.VerticalOrigin.TOP
    }
  });

  console.log("Clicked location:", lat, lon);
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
