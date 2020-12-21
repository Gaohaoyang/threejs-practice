import * as THREE from 'three'
// import typeface from './typeface.json'

const width = 400
const height = 300

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper(2.5)
scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera(45, width / height, 1, 400)
camera.position.set(8, 2, 8)
camera.lookAt(new THREE.Vector3(3, 0, 0))
scene.add(camera)

const loader = new THREE.FontLoader()

loader.load(
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const geometry = new THREE.TextGeometry('Hello three.js!', {
      font,
      size: 1,
      height: 0.5,
      curveSegments: 4,
    })

    const material = new THREE.MeshBasicMaterial({
      wireframe: true,
    })
    const textObj = new THREE.Mesh(geometry, material)
    scene.add(textObj)
    renderer.render(scene, camera)
  },
)
