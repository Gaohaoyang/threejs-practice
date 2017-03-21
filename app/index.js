import './index.scss';

const THREE = require('three');

// 坐标轴
const drawAxes = (scene) => {
  // x-axis
  const xGeo = new THREE.Geometry();
  xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
  xGeo.vertices.push(new THREE.Vector3(40, 0, 0));
  const xMat = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const xAxis = new THREE.Line(xGeo, xMat);
  scene.add(xAxis);

  // y-axis
  const yGeo = new THREE.Geometry();
  yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
  yGeo.vertices.push(new THREE.Vector3(0, 40, 0));
  const yMat = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  const yAxis = new THREE.Line(yGeo, yMat);
  scene.add(yAxis);

  // z-axis
  const zGeo = new THREE.Geometry();
  zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
  zGeo.vertices.push(new THREE.Vector3(0, 0, 40));
  const zMat = new THREE.LineBasicMaterial({ color: 0x00ccff });
  const zAxis = new THREE.Line(zGeo, zMat);
  scene.add(zAxis);
};

const init = () => {
  // renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  document.body.appendChild(renderer.domElement);

  // scene
  const scene = new THREE.Scene();

  // camera
  // const camera = new THREE.OrthographicCamera(-100, 100, 75, -75, 0.1, 200);
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(120, 50, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  // draw axes to help you understand the coordinate
  // drawAxes(scene);

  // 材质
  // const material = new THREE.MeshLambertMaterial({
  //   color: 0xffff00,
  //   // wireframe: true
  // });
  const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    specular: 0xffff00,
    shininess: 100
  });

  // 光源
  const light = new THREE.DirectionalLight();
  light.position.set(2, 5, 3);
  scene.add(light);

  // 车体
  const carBody = new THREE.BoxGeometry(80, 50, 50, 10, 10, 5);
  const carBodyWithMaterial = new THREE.Mesh(carBody, material);
  scene.add(carBodyWithMaterial);

  // 轮子
  const wheel = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheelWithMaterial = new THREE.Mesh(wheel, material);
  wheelWithMaterial.position.set(-25, -25, 25);
  scene.add(wheelWithMaterial);

  const wheel2 = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel2WithMaterial = new THREE.Mesh(wheel2, material);
  wheel2WithMaterial.position.set(-25, -25, -25);
  scene.add(wheel2WithMaterial);

  const wheel3 = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel3WithMaterial = new THREE.Mesh(wheel3, material);
  wheel3WithMaterial.position.set(25, -25, -25);
  scene.add(wheel3WithMaterial);

  const wheel4 = new THREE.TorusGeometry(8, 3, 10, 20);
  const wheel4WithMaterial = new THREE.Mesh(wheel4, material);
  wheel4WithMaterial.position.set(25, -25, 25);
  scene.add(wheel4WithMaterial);

  renderer.render(scene, camera);
};

init();
