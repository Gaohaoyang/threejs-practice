import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer()
renderer.setSize(400, 300)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)

const cube = new THREE.Mesh(
  new THREE.CubeGeometry(1, 2, 3),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  }),
)

scene.add(cube)

renderer.render(scene, camera)
