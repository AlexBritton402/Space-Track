// Three.js globe example using Earth textures hosted online
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add light
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Earth sphere
const geometry = new THREE.SphereGeometry(0.9, 64, 64);
const texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/VirtualGlobes/webgl-earth/master/images/earth.jpg');
const material = new THREE.MeshStandardMaterial({ map: texture });
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Animate rotation
function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
