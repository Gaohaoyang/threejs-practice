import * as THREE from 'three'

const width = 400
const height = 300

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

const camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 1, 100)
camera.position.set(5, 6, 7)
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

// const geometry = new THREE.BoxGeometry(1, 2, 3, 3, 3, 3)
// const geometry = new THREE.PlaneGeometry(3, 4)
// const geometry = new THREE.SphereGeometry(2, 8, 8)
// const geometry = new THREE.CircleGeometry(2, 28)
// const geometry = new THREE.CylinderGeometry(2, 2, 3, 16, 8)
const geometry = new THREE.TorusGeometry(2, 0.4, 8, 16)
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

renderer.render(scene, camera)
