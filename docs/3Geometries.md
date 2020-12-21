在创建物体时，需要传入两个参数，一个是几何形状（Geometry），另一个是材质（Material）。本章将介绍几何形状的创建，第4章介绍材质，第5章介绍如何使用这两者创建网格。

几何形状（Geometry）最主要的功能是储存了一个物体的顶点信息。WebGL需要程序员指定每个顶点的位置，而在Three.js中，可以通过指定一些特征来创建几何形状，例如使用半径创建一个球体，从而省去程序员一个个指定顶点的工作量。

本节将分别介绍立方体、平面、球体、圆柱体、四面体、八面体等几何形状，以及以三维文字作为几何形状的方法。本节还会介绍通过手动定义顶点位置和面片信息组成几何形状。

## 基本几何形状

### 立方体

```js
BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
```

- width — X轴上面的宽度，默认值为1。
- height — Y轴上面的高度，默认值为1。
- depth — Z轴上面的深度，默认值为1。
- widthSegments — （可选）宽度的分段数，默认值是1。
- heightSegments — （可选）宽度的分段数，默认值是1。
- depthSegments — （可选）宽度的分段数，默认值是1。

```js
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

const geometry = new THREE.BoxGeometry(1, 2, 3)
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

renderer.render(scene, camera)
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01tvRHzR1RAYtit34qu_!!6000000002071-2-tps-998-834.png)

分段

```js
const geometry = new THREE.BoxGeometry(1, 2, 3, 3, 3, 3)
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01toOczc1JGxVGvdj84_!!6000000001002-2-tps-998-814.png)

### 平面

```js
PlaneGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)
```

- width — 平面沿着X轴的宽度。默认值是1。
- height — 平面沿着Y轴的高度。默认值是1。
- widthSegments — （可选）平面的宽度分段数，默认值是1。
- heightSegments — （可选）平面的高度分段数，默认值是1。

```js
const geometry = new THREE.PlaneGeometry(3, 4)
```

![](https://gw.alicdn.com/imgextra/i4/O1CN01H5jmDX1k3fdZzTc1Q_!!6000000004628-2-tps-982-824.png)

### 球体

```js
SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
```

- radius — 球体半径，默认为1。
- widthSegments — 水平分段数（沿着经线分段），最小值为3，默认值为8。
- heightSegments — 垂直分段数（沿着纬线分段），最小值为2，默认值为6。
- phiStart — 指定水平（经线）起始角度，默认值为0。。
- phiLength — 指定水平（经线）扫描角度的大小，默认值为 Math.PI * 2。
- thetaStart — 指定垂直（纬线）起始角度，默认值为0。
- thetaLength — 指定垂直（纬线）扫描角度大小，默认值为 Math.PI。

该几何体是通过扫描并计算围绕着Y轴（水平扫描）和X轴（垂直扫描）的顶点来创建的。 因此，不完整的球体（类似球形切片）可以通过为phiStart，phiLength，thetaStart和thetaLength设置不同的值来创建， 以定义我们开始（或结束）计算这些顶点的起点（或终点）。

```js
const geometry = new THREE.SphereGeometry(2, 8, 8)
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01XBDviY1WqJ4q98whx_!!6000000002839-2-tps-948-818.png)

### 圆形

```js
CircleGeometry(radius : Float, segments : Integer, thetaStart : Float, thetaLength : Float)
```

- radius — 圆形的半径，默认值为1
- segments — 分段（三角面）的数量，最小值为3，默认值为8。
- thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）
- thetaLength — 圆形扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆。

```js
const geometry = new THREE.CircleGeometry(2, 28)
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01oKT78x1t6GQIWV0mi_!!6000000005852-2-tps-934-830.png)

### 圆柱

```js
CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
```

- radiusTop — 圆柱的顶部半径，默认值是1。
- radiusBottom — 圆柱的底部半径，默认值是1。
- height — 圆柱的高度，默认值是1。
- radialSegments — 圆柱侧面周围的分段数，默认为8。
- heightSegments — 圆柱侧面沿着其高度的分段数，默认值为1。
- openEnded — 一个Boolean值，指明该圆锥的底面是开放的还是封顶的。默认值为false，即其底面默认是封顶的。
- thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）
- thetaLength — 圆柱底面圆扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆柱。

```js
const geometry = new THREE.CylinderGeometry(2, 2, 3, 16, 8)
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01ZXO1nn1mu07hmhS6S_!!6000000005013-2-tps-918-802.png)

### 圆环

```js
TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
```

- radius - 圆环的半径，从圆环的中心到管道（横截面）的中心。默认值是1。
- tube — 管道的半径，默认值为0.4。
- radialSegments — 圆环的分段数，默认值为8。
- tubularSegments — 管道的分段数，默认值为6。
- arc — 圆环的中心角（单位是弧度），默认值为Math.PI * 2。

```js
const geometry = new THREE.TorusGeometry(2, 0.4, 8, 16)
```

![](https://gw.alicdn.com/imgextra/i1/O1CN015mK4fa1hjrH4SUVnr_!!6000000004314-2-tps-948-832.png)

## 文字几何体 TextGeometry

构造函数

```js
TextGeometry(text : String, parameters : Object)
```

- text — 将要显示的文本。
- parameters — 包含有下列参数的对象：
  - font — THREE.Font的实例。
  - size — Float。字体大小，默认值为100。
  - height — Float。挤出文本的厚度。默认值为50。
  - curveSegments — Integer。（表示文本的）曲线上点的数量。默认值为12。
  - bevelEnabled — Boolean。是否开启斜角，默认为false。
  - bevelThickness — Float。文本上斜角的深度，默认值为20。
  - bevelSize — Float。斜角与原始文本轮廓之间的延伸距离。默认值为8。
  - bevelSegments — Integer。斜角的分段数。默认值为3。

```js
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
```

![](https://gw.alicdn.com/imgextra/i4/O1CN01Y6Kcbc1KmqhHqx3BC_!!6000000001207-2-tps-934-824.png)

## 自定义几何体 Geometry

对于Three.js没有提供的形状，可以提供自定义形状来创建。

由于自定义形状需要手动指定每个顶点位置，以及顶点连接情况，如果该形状非常复杂，程序员的计算量就会比较大。在这种情况下，建议在 3ds Max 之类的建模软件中创建模型，然后使用Three.js导入到场景中，这样会更高效方便。

自定义形状使用的是Geometry类，它是其他如CubeGeometry、SphereGeometry等几何形状的父类，其构造函数是：

```js
THREE.Geometry()
```

