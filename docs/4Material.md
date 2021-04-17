材质（Material）是独立于物体顶点信息之外的与渲染效果相关的属性。通过设置材质可以改变物体的颜色、纹理贴图、光照模式等。

## 基本材质 MeshBasicMaterial

MeshBasicMaterial

一个以简单着色（平面或线框）方式来绘制几何体的材质。这种材质不受光照的影响。

### 构造函数

```js
MeshBasicMaterial( parameters : Object )
```

- parameters - (可选)用于定义材质外观的对象，具有一个或多个属性。材质的任何属性都可以从此处传入(包括从Material继承的任何属性)。

属性color例外，其可以作为十六进制字符串传递，默认情况下为 0xffffff（白色），内部调用Color.set(color)。

### 属性(Properties)

- https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial

### 示例

```js
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
```

![](https://gw.alicdn.com/imgextra/i2/O1CN0186oO9e1RXv6ALXR1S_!!6000000002122-2-tps-940-826.png)

对于基本材质，即使改变场景中的光源，使用该材质的物体也始终为颜色处处相同的效果。当然，这不是很具有真实感，因此，接下来我们将介绍更为真实的光照模型：Lambert光照模型以及Phong光照模型。

## MeshLambertMaterial

一种非光泽表面的材质，没有镜面高光。

该材质使用基于非物理的Lambertian模型来计算反射率。 这可以很好地模拟一些表面（例如未经处理的木材或石材），但不能模拟具有镜面高光的光泽表面（例如涂漆木材）。

### 示例

```js
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
const material = new THREE.MeshLambertMaterial({
  color: 0xff00ff,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const light = new THREE.DirectionalLight()
light.position.set(2, 3, 4)
scene.add(light)

renderer.render(scene, camera)
```

![](https://gw.alicdn.com/imgextra/i4/O1CN01XcMVn41FvU5NEGXHR_!!6000000000549-2-tps-894-796.png)

其中除了设置 lambert 材质外，还设置了平行光源，以便看到物体

```js
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshLambertMaterial({
  color: 0xff00ff,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const light = new THREE.DirectionalLight()
light.position.set(2, 3, 4)
scene.add(light)
```

## Phong 材质

Phong材质（MeshPhongMaterial）是符合Phong光照模型的材质。和Lambert不同的是，Phong模型考虑了镜面反射的效果，因此对于金属、镜面的表现尤为适合。

由于漫反射部分与Lambert模型是一致的，因此，如果不指定镜面反射系数，而只设定漫反射，其效果与Lambert是相同的

```js
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
const material = new THREE.MeshPhongMaterial({
  color: 0xff00ff,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const light = new THREE.DirectionalLight()
light.position.set(2, 3, 4)
scene.add(light)

renderer.render(scene, camera)
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01MrAqiR1xFf0nGWA1C_!!6000000006414-2-tps-984-824.png)
