import './index.scss';
import Axes from './Axes';

const THREE = require('three');

import './CSS3DRenderer.js'; // 引入 CSS3DRenderer 属性

const TrackballControls = require('three-trackballcontrols');
const Stats = require('stats-js');

let scene,
  scene2,
  camera,
  renderer,
  renderer2,
  controls,
  stats,
  carGroup;

/**
 * init
 */
const init = () => {

  // renderer
  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  document.body.appendChild(renderer.domElement);

  renderer2 = new THREE.CSS3DRenderer();
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = 'absolute';
  renderer2.domElement.style.top = 0;
  document.body.appendChild(renderer2.domElement);

  // scene
  scene = new THREE.Scene();
  scene2 = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
  camera.position.set(-200, 100, 1600);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // controls
  controls = new TrackballControls(camera);
  controls.minDistance = 0.1; //控制缩放的范围
  controls.maxDistance = 2500;
  controls.addEventListener('change', render);

  // draw axes to help you understand the coordinate
  Axes.drawAxes(scene);

  // 光源
  const ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);

  const light = new THREE.DirectionalLight(0xdddddd);
  light.position.set(-200, 400, 500);
  light.castShadow = true;

  light.shadow.mapSize.width = 512;
  light.shadow.mapSize.heigh = 512;
  light.shadow.camera.left = -90;
  light.shadow.camera.right = 90;
  light.shadow.camera.top = 60;
  light.shadow.camera.bottom = -60;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 1000;
  scene.add(light);

  // 纹理
  const loader = new THREE.TextureLoader();
  // allow cross origin loading
  loader.crossOrigin = '';
  // const texture = loader.load('./assets/qrcode.png',()=>{
  const carTexture = loader.load('https://img.alicdn.com/tfs/TB1zLjDQXXXXXbfaXXXXXXXXXXX-64-64.png', () => {
    renderer.render(scene, camera);
  });
  const wheelTexture = loader.load('https://img.alicdn.com/tfs/TB1Uv69QXXXXXaEXpXXXXXXXXXX-600-600.png', () => {
    renderer.render(scene, camera);
  });
  const roadTexture = loader.load('https://img.alicdn.com/tfs/TB19aLQQXXXXXazXVXXXXXXXXXX-150-150.png', () => {
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
  const carGeometry = new THREE.BoxGeometry(80, 50, 50, 10, 10, 5);
  const carBody = new THREE.Mesh(carGeometry, material);
  carBody.castShadow = true;

  // 轮子
  const wheelGeometry = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheel.position.set(-25, -25, 25);
  wheel.castShadow = true;

  const wheel2Geometry = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel2 = new THREE.Mesh(wheel2Geometry, wheelMaterial);
  wheel2.position.set(-25, -25, -25);
  wheel2.castShadow = true;

  const wheel3Geometry = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel3 = new THREE.Mesh(wheel3Geometry, wheelMaterial);
  wheel3.position.set(25, -25, -25);
  wheel3.castShadow = true;

  const wheel4Geometry = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel4 = new THREE.Mesh(wheel4Geometry, wheelMaterial);
  wheel4.position.set(25, -25, 25);
  wheel4.castShadow = true;

  //create a group and add the two cubes
  //These cubes can now be rotated / scaled etc as a group
  carGroup = new THREE.Group();
  carGroup.add(carBody);
  carGroup.add(wheel);
  carGroup.add(wheel2);
  carGroup.add(wheel3);
  carGroup.add(wheel4);
  scene.add(carGroup);
  // group.add( cubeB );

  const planeGeometry = new THREE.PlaneGeometry(240, 240);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x9bb975, side: THREE.DoubleSide, map: roadTexture
    // wireframe: true
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -66;
  plane.position.z = -50;
  plane.receiveShadow = true;
  scene.add(plane);

  // 展示板
  // var boardGeometry = new THREE.PlaneGeometry(240, 240, 30);
  // var boardMaterial = new THREE.MeshBasicMaterial({blending: THREE.NoBlending, opacity: 0.0, transparent: true, color: 0x000000, side: THREE.DoubleSide});
  // // boardMaterial.color.set('black');
  // // boardMaterial.opacity = 0;
  // // boardMaterial.blending = THREE.NoBlending;
  // var board = new THREE.Mesh(boardGeometry, boardMaterial);
  // board.position.z = -200;
  // // add it to the WebGL scene
  // scene.add(board);

  //HTML
  const element = document.createElement('div');
  element.innerHTML = '<iframe src="https://gaohaoyang.github.io/" width="350" height="550"></iframe>';
  element.className = 'three-div';

  //CSS Object
  const div = new THREE.CSS3DObject(element);
  // div.position.y = board.position.y;
  // div.position.z = board.position.z;
  // div.rotation.x = board.rotation.x;
  // div.rotation.y = board.rotation.y;
  // div.rotation.z = board.rotation.z;
  div.position.x = 250;
  div.position.y = 20;
  div.position.z = 180;
  div.rotation.y = -Math.PI/8;
  scene2.add(div);

  // Create a helper for the shadow camera (optional)
  const helper = new THREE.CameraHelper(light.shadow.camera);
  scene.add(helper);

  // 性能测试
  stats = new Stats();
  stats.domElement.style.position = 'fixed';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  stats.setMode(0); // 0: fps, 1: ms,
  document.body.appendChild(stats.domElement);

  // render();
};

/**
 * 动画
 */
const animate = () => {
  requestAnimationFrame(animate);
  carGroup.rotation.x += 0.01;
  carGroup.rotation.y += 0.01;
  // carGroup.rotation.z += 0.01;
  renderer2.render(scene2, camera);
  renderer.render(scene, camera);
  stats.update();
  controls.update();
};

/**
 * 渲染
 */
const render = () => {
  renderer2.render(scene2, camera);
  renderer.render(scene, camera);
};

init();
animate();
