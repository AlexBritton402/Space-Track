const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(),
  shouldAnimate: true
});

// Example marker click
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
    label: { text: `Lat: ${lat}, Lon: ${lon}`, font: "14px sans-serif", verticalOrigin: Cesium.VerticalOrigin.TOP }
  });

  fetch(`https://your-backend.onrender.com/get-visible?lat=${lat}&lon=${lon}&radius=20`)
    .then(res => res.json())
    .then(data => {
      data.satellites.forEach(sat => {
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(sat.lon, sat.lat, sat.alt_km * 1000),
          point: { pixelSize: 6, color: Cesium.Color.RED },
          label: { text: sat.name, font: "12px sans-serif" }
        });
      });
    })
    .catch(err => console.error("Error fetching satellites:", err));
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
