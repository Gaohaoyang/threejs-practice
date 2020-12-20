## 开始使用 Three.js

一个典型的 Three.js 程序至少要包括 **渲染器（Renderer）、场景（Scene）、照相机（Camera）**，以及你在场景中创建的物体。


### 渲染器（Renderer）

渲染器将和 Canvas 元素进行绑定，如果之前在 HTML 中手动定义了 id 为mainCanvas 的 Canvas 元素，那么 Renderer 可以这样写：

```html
<canvas id="mainCanvas" width="400px" height="300px"></canvas>
```

```js
import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('mainCanvas'),
})
```

![](https://gw.alicdn.com/imgextra/i4/O1CN01pMtRJE1sPfaYGf2MR_!!6000000005759-2-tps-1020-844.png)

也可以直接使用 Three.js 生成 canvas 标签，代码如下：

```js
import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer()
renderer.setSize(400, 300)
document.body.appendChild(renderer.domElement)
```

效果同上

### 场景（Scene）

在 Three.js 中添加的物体都是添加到场景中的，因此它相当于一个大容器。一般说，场景里没有很复杂的操作，在程序最开始的时候进行实例化，然后将物体添加到场景中即可。

### 照相机（Camera）

在介绍照相机设置前，我们先来简单了解下坐标系。WebGL 和 Three.js 使用的坐标系是右手坐标系，看起来就是这样的：

![](https://gw.alicdn.com/imgextra/i1/O1CN01prOehi1WIsA9zszfs_!!6000000002766-2-tps-411-473.png)

这里，我们定义了一个透视投影的照相机

```js
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)
```

照相机也需要被添加到场景中

### 长方体

我们要创建一个x、y、z方向长度分别为1、2、3的长方体，并将其设置为红色。

```js
const cube = new THREE.Mesh(
  new THREE.CubeGeometry(1, 2, 3),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  }),
)

scene.add(cube)
```

这段代码也是比较容易理解的，虽然你现在可能还不知道MeshBasicMaterial是什么，但是大致可以猜测出这是一种材质，可以用来设置物体的颜色。还是要提醒下，一定要记得把创建好的长方体添加到场景中。

那么这里长度为1的单位是什么呢？这里的长度是在物体坐标系中的，其单位与屏幕分辨率等无关，简单地说，它就是一个虚拟空间的坐标系，1代表多少并没有实际的意义，而重要的是相对长度。

### 渲染

在定义了场景中的物体，设置好的照相机之后，渲染器就知道如何渲染出二维的结果了。这时候，我们只需要调用渲染器的渲染函数，就能使其渲染一次了。

```js
renderer.render(scene, camera)
```

### 完整代码

```js
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
```

最终效果

![](https://gw.alicdn.com/imgextra/i3/O1CN01ulp7eo205zUnPTNPf_!!6000000006799-2-tps-928-806.png)

## Three.js功能概览

下面就让我们看下Three.js官网文档中的一些重要的对象，在你需要寻求帮助时，就能够知道关键词是什么。

```
Cameras（照相机，控制投影方式）

    Camera
    OrthographicCamera
    PerspectiveCamera

Core（核心对象）

    BufferGeometry
    Clock（用来记录时间）
    EventDispatcher
    Face3
    Face4
    Geometry
    Object3D
    Projector
    Raycaster（计算鼠标拾取物体时很有用的对象）

Lights（光照）
    Light
    AmbientLight
    AreaLight
    DirectionalLight
    HemisphereLight
    PointLight
    SpotLight

Loaders（加载器，用来加载特定文件）
    Loader
    BinaryLoader
    GeometryLoader
    ImageLoader
    JSONLoader
    LoadingMonitor
    SceneLoader
    TextureLoader

Materials（材质，控制物体的颜色、纹理等）
    Material
    LineBasicMaterial
    LineDashedMaterial
    MeshBasicMaterial
    MeshDepthMaterial
    MeshFaceMaterial
    MeshLambertMaterial
    MeshNormalMaterial
    MeshPhongMaterial
    ParticleBasicMaterial
    ParticleCanvasMaterial
    ParticleDOMMaterial
    ShaderMaterial
    SpriteMaterial

Math（和数学相关的对象）

    Box2
    Box3
    Color
    Frustum
    Math
    Matrix3
    Matrix4
    Plane
    Quaternion
    Ray
    Sphere
    Spline
    Triangle
    Vector2
    Vector3
    Vector4

Objects（物体）

    Bone
    Line
    LOD
    Mesh（网格，最常用的物体）
    MorphAnimMesh
    Particle
    ParticleSystem
    Ribbon
    SkinnedMesh
    Sprite

Renderers（渲染器，可以渲染到不同对象上）

    CanvasRenderer
    WebGLRenderer（使用WebGL渲染，这是本书中最常用的方式）
    WebGLRenderTarget
    WebGLRenderTargetCube
    WebGLShaders（着色器，在最后一章作介绍）

Renderers / Renderables

    RenderableFace3
    RenderableFace4
    RenderableLine
    RenderableObject
    RenderableParticle
    RenderableVertex

Scenes（场景）

    Fog
    FogExp2
    Scene

Textures（纹理）

    CompressedTexture
    DataTexture
    Texture

Extras

    FontUtils
    GeometryUtils
    ImageUtils
    SceneUtils

Extras / Animation

    Animation
    AnimationHandler
    AnimationMorphTarget
    KeyFrameAnimation

Extras / Cameras

    CombinedCamera
    CubeCamera

Extras / Core

    Curve
    CurvePath
    Gyroscope
    Path
    Shape

Extras / Geometries（几何形状）

    CircleGeometry
    ConvexGeometry
    CubeGeometry
    CylinderGeometry
    ExtrudeGeometry
    IcosahedronGeometry
    LatheGeometry
    OctahedronGeometry
    ParametricGeometry
    PlaneGeometry
    PolyhedronGeometry
    ShapeGeometry
    SphereGeometry
    TetrahedronGeometry
    TextGeometry
    TorusGeometry
    TorusKnotGeometry
    TubeGeometry

Extras / Helpers

    ArrowHelper
    AxisHelper
    CameraHelper
    DirectionalLightHelper
    HemisphereLightHelper
    PointLightHelper
    SpotLightHelper

Extras / Objects

    ImmediateRenderObject
    LensFlare
    MorphBlendMesh

Extras / Renderers / Plugins

    DepthPassPlugin
    LensFlarePlugin
    ShadowMapPlugin
    SpritePlugin

Extras / Shaders

    ShaderFlares
    ShaderSprite
```
