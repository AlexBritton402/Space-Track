Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NjA0Mjc4MC1kOTE1LTRlZWEtYThlZC0xZDEwYzVlZjIwYzciLCJpZCI6MzI3NjAwLCJpYXQiOjE3NTQwMzgwMzd9.93TS4XH08s33P0tkINAlek26auqBlVFjIaNVc1JN3Ag';

const viewer = new Cesium.Viewer('cesiumContainer', {
  terrain: Cesium.createWorldTerrain(),
  baseLayerPicker: false,
  animation: false,
  timeline: false
});
