import * as THREE from 'three'

const width = 400
const height = 300

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
})
const box = new THREE.Mesh(geometry, material)
scene.add(box)

const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10)
camera.position.set(4, 3, 5)
camera.lookAt(new THREE.Vector3(0, 0, 0))

renderer.render(scene, camera)
