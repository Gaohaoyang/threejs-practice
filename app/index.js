const THREE = require('three');

const init = () => {

  // renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(400, 300);
  renderer.setClearColor(0x000000);
  document.body.appendChild(renderer.domElement);

  // scene
  const scene = new THREE.Scene();

  // camera
  // const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
  // camera.position.set(0, 0, 5);
  // scene.add(camera);

  var camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 10);
  camera.position.set(0, 0, 5);
  scene.add(camera);

  // a cube in the scene
  var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })
);
  scene.add(cube);
  renderer.render(scene, camera);
};

init();
