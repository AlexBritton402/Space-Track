const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff));

const geo = new THREE.SphereGeometry(0.9, 64, 64);
const loader = new THREE.TextureLoader();
loader.load('https://raw.githubusercontent.com/VirtualGlobes/webgl-earth/master/images/earth.jpg', tex => {
  const mat = new THREE.MeshStandardMaterial({ map: tex });
  const earth = new THREE.Mesh(geo, mat);
  scene.add(earth);

  animate();

  function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
