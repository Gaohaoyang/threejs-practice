import './index.scss';
import Axes from './Axes';

const THREE = require('three');
const TrackballControls = require('three-trackballcontrols');

let scene,
  camera,
  renderer;

const init = () => {

  // scene
  scene = new THREE.Scene();

  // camera
  // const camera = new THREE.OrthographicCamera(-100, 100, 75, -75, 0.1, 200);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(200, 120, 240);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const controls = new TrackballControls(camera);

  controls.addEventListener('change', render);

  // draw axes to help you understand the coordinate
  Axes.drawAxes(scene);

  // 光源
  var ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  const light = new THREE.DirectionalLight(0xdddddd);
  light.position.set(-200, 400, 500);
  light.castShadow = true;

  light.shadow.mapSize.width = 512;
  light.shadow.mapSize.heigh = 512;
  light.shadow.camera.left = -90;
  light.shadow.camera.right = 90;
  light.shadow.camera.top = 50;
  light.shadow.camera.bottom = -90;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 1000;

  scene.add(light);

  // load a texture, set wrap mode to repeat
  var loader = new THREE.TextureLoader();
  //allow cross origin loading
  loader.crossOrigin = '';

  // var texture = loader.load('./assets/qrcode.png',()=>{
  var carTexture = loader.load('https://img.alicdn.com/tfs/TB1zLjDQXXXXXbfaXXXXXXXXXXX-64-64.png', () => {
    renderer.render(scene, camera);
  });
  const wheelTexture = loader.load('https://img.alicdn.com/tfs/TB1Uv69QXXXXXaEXpXXXXXXXXXX-600-600.png', () => {
    renderer.render(scene, camera);
  });
  var roadTexture = loader.load('https://img.alicdn.com/tfs/TB19aLQQXXXXXazXVXXXXXXXXXX-150-150.png', () => {
    renderer.render(scene, camera);
  });
  roadTexture.wrapS = THREE.RepeatWrapping;
  roadTexture.wrapT = THREE.RepeatWrapping;
  roadTexture.repeat.set(3, 3);

  // 小车材质
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff, map: carTexture
    // wireframe: true
  });
  // 轮子材质
  const wheelMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff, map: wheelTexture
    // wireframe: true
  });

  // 车体
  const carBody = new THREE.BoxGeometry(80, 50, 50, 10, 10, 5);
  const carBodyWithMaterial = new THREE.Mesh(carBody, material);
  carBodyWithMaterial.castShadow = true;
  scene.add(carBodyWithMaterial);

  // 轮子
  const wheel = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheelWithMaterial = new THREE.Mesh(wheel, wheelMaterial);
  wheelWithMaterial.position.set(-25, -25, 25);
  wheelWithMaterial.castShadow = true;
  scene.add(wheelWithMaterial);

  const wheel2 = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel2WithMaterial = new THREE.Mesh(wheel2, wheelMaterial);
  wheel2WithMaterial.position.set(-25, -25, -25);
  wheel2WithMaterial.castShadow = true;
  scene.add(wheel2WithMaterial);

  const wheel3 = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel3WithMaterial = new THREE.Mesh(wheel3, wheelMaterial);
  wheel3WithMaterial.position.set(25, -25, -25);
  wheel3WithMaterial.castShadow = true;
  scene.add(wheel3WithMaterial);

  const wheel4 = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel4WithMaterial = new THREE.Mesh(wheel4, wheelMaterial);
  wheel4WithMaterial.position.set(25, -25, 25);
  wheel4WithMaterial.castShadow = true;
  scene.add(wheel4WithMaterial);

  const planeGeometry = new THREE.PlaneGeometry(240, 240);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x9bb975,
    // side: THREE.DoubleSide,
    map: roadTexture
    // wireframe: true
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -36;
  plane.receiveShadow = true;
  scene.add(plane);

  //Create a helper for the shadow camera (optional)
  // var helper = new THREE.CameraHelper( light.shadow.camera );
  // scene.add( helper );

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);
};

function render() {
  renderer.render(scene, camera);
  // stats.update();
}

init();
