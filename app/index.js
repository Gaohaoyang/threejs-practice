import './index.scss';
import Axes from './Axes';

const THREE = require('three');

const init = () => {
  // renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // scene
  const scene = new THREE.Scene();

  // camera
  // const camera = new THREE.OrthographicCamera(-100, 100, 75, -75, 0.1, 200);
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(120, 50, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  // draw axes to help you understand the coordinate
  Axes.drawAxes(scene);

  // 材质
  const material = new THREE.MeshLambertMaterial({
    color: 0x999999,
    // wireframe: true
  });

  // 车体
  const carBody = new THREE.BoxGeometry(80, 50, 50, 10, 10, 5);
  const carBodyWithMaterial = new THREE.Mesh(carBody, material);
  carBodyWithMaterial.castShadow = true; //default is false
  scene.add(carBodyWithMaterial);

  // 轮子
  const wheel = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheelWithMaterial = new THREE.Mesh(wheel, material);
  wheelWithMaterial.position.set(-25, -25, 25);
  wheelWithMaterial.castShadow = true; //default is false
  scene.add(wheelWithMaterial);

  const wheel2 = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel2WithMaterial = new THREE.Mesh(wheel2, material);
  wheel2WithMaterial.position.set(-25, -25, -25);
  wheel2WithMaterial.castShadow = true; //default is false
  scene.add(wheel2WithMaterial);

  const wheel3 = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel3WithMaterial = new THREE.Mesh(wheel3, material);
  wheel3WithMaterial.position.set(25, -25, -25);
  wheel3WithMaterial.castShadow = true; //default is false
  scene.add(wheel3WithMaterial);

  const wheel4 = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel4WithMaterial = new THREE.Mesh(wheel4, material);
  wheel4WithMaterial.position.set(25, -25, 25);
  wheel4WithMaterial.castShadow = true; //default is false
  scene.add(wheel4WithMaterial);

  // 地平面
  const ground = new THREE.PlaneGeometry(300, 300);
  const groundWithMaterial = new THREE.Mesh(ground, material);
  groundWithMaterial.rotation.x = -Math.PI / 2;
  groundWithMaterial.position.y = -33.5;
  ground.receiveShadow = true;
  scene.add(groundWithMaterial);

  // 光源
  const light = new THREE.DirectionalLight();
  light.position.set(2, 5, 3);
  scene.add(light);


  renderer.render(scene, camera);
};

init();
