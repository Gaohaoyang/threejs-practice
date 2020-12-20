## 透视投影 vs 正交投影

透视相机 PerspectiveCamera，这一投影模式被用来模拟人眼所看到的景象，它是 3D 场景的渲染中使用得最普遍的投影模式。

正交相机 OrthographicCamera，在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。

一般说来，对于制图、建模软件通常使用正交投影，这样不会因为投影而改变物体比例；而对于其他大多数应用，通常使用透视投影，因为这更接近人眼的观察效果。

![](https://gw.alicdn.com/imgextra/i3/O1CN01Ldw2It1dHE3DsPgVS_!!6000000003710-2-tps-537-244.png)

## 正交投影照相机

构造函数

```
OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
```

- left — 摄像机视锥体左侧面。
- right — 摄像机视锥体右侧面。
- top — 摄像机视锥体上侧面。
- bottom — 摄像机视锥体下侧面。
- near — 摄像机视锥体近端面。
- far — 摄像机视锥体远端面。

这些参数一起定义了摄像机的 viewing frustum（视锥体），下图灰色部分为 frustum，只有在视景体内部（下图中的灰色部分）的物体才可能显示在屏幕上，而视景体外的物体会在显示之前被裁减掉。

![](https://gw.alicdn.com/imgextra/i2/O1CN01hD4lrM1H1GhifTQiH_!!6000000000697-2-tps-700-632.png)

为了保持照相机的横竖比例，需要保证 `(right - left)` 与 `(top - bottom)` 的比例与 Canvas 宽度与高度的比例一致。

### 基本设置

```js
import * as THREE from 'three'

const width = 400
const height = 300

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10)
camera.position.set(0, 0, 5)
scene.add(camera)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
})
const box = new THREE.Mesh(geometry, material)
scene.add(box)

renderer.render(scene, camera)
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01aI65H81Z7pSeLrlNd_!!6000000003148-2-tps-1044-828.png)

我们看到正交投影的结果是一个正方形，后面的边与前面完全重合了，这也就是正交投影与透视投影的区别所在。

### 长宽比例

这里，我们的 Canvas 宽度是 400px，高度是 300px，照相机水平方向距离 4，垂直方向距离 3，因此长宽比例保持不变。为了试验长宽比例变化时的效果，我们将照相机水平方向的距离减小为 2：

```js
const camera = new THREE.OrthographicCamera(-1, 1, 1.5, -1.5, 1, 10)
```

![](https://gw.alicdn.com/imgextra/i1/O1CN01G1mYKQ1h561Xv3E3P_!!6000000004225-2-tps-960-826.png)

### 相机位置

```js
camera.position.set(1, 0, 5)
```

相机向右移动 1 格，那么物体会向画面的左边移动

![](https://gw.alicdn.com/imgextra/i4/O1CN01H7C9n01HU7edn9RHA_!!6000000000760-2-tps-938-800.png)

### 换个角度看世界

将相机放置在 `(4, 3, 5)` 这个点上，并指向 `(0, 0, 0)`

```js
camera.position.set(4, 3, 5)
camera.lookAt(new THREE.Vector3(0, 0, 0))
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01TDcEQG1ky0M6JsyZA_!!6000000004751-2-tps-994-814.png)


完整代码

```js
import * as THREE from 'three'

const width = 400
const height = 300

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10)
camera.position.set(4, 3, 5)
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
})
const box = new THREE.Mesh(geometry, material)
scene.add(box)

renderer.render(scene, camera)
```

## 透视投影照相机

构造函数

```js
PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
```

- fov — 摄像机视锥体垂直视野角度
- aspect — 摄像机视锥体长宽比
- near — 摄像机视锥体近端面
- far — 摄像机视锥体远端面

这些参数一起定义了摄像机的viewing frustum（视锥体）。

![](https://gw.alicdn.com/imgextra/i2/O1CN01PyRDNn1oe5asMv6pZ_!!6000000005249-2-tps-700-304.png)

透视图中，灰色的部分是视锥体，是可能被渲染的物体所在的区域。fov是视锥体竖直方向上的张角（是角度制而非弧度制），如侧视图所示。

aspect 等于width / height，是照相机水平方向和竖直方向长度的比值，通常设为Canvas的横纵比例。

near和far分别是照相机到视锥体最近、最远的距离，均为正值，且far应大于near。

### 基本设置

```js
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
camera.position.set(0, 0, 5)

renderer.render(scene, camera)
```

![](https://gw.alicdn.com/imgextra/i1/O1CN01Tr88t01J6QOWp1Mvr_!!6000000000979-2-tps-1014-824.png)

### 竖直张角 fov

设置为60度

```js
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10)
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01fGLN3I23Zi2nwL5V6_!!6000000007270-2-tps-978-808.png)

变小了？侧视图来看，虽然正方体的实际大小并未改变，但是将照相机的竖直张角设置得更大时，视景体变大了，因而正方体相对于整个视景体的大小就变小了，看起来正方形就显得变小了。

![](https://gw.alicdn.com/imgextra/i1/O1CN01XDWSOI1Nj8KeeXwgI_!!6000000001605-2-tps-290-326.png)

### 换个角度

```js
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
```

![](https://gw.alicdn.com/imgextra/i4/O1CN01f1VTrf1nOEGV9PJwi_!!6000000005079-2-tps-988-862.png)
