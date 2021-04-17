import * as THREE from 'three'

const width = 400
const height = 300

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper(2.5)
scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera(45, width / height, 1, 50)
camera.position.set(2, 3, 4)
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

renderer.render(scene, camera)
