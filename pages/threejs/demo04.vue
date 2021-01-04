<template>
  <div id="demo-04"></div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 创建一个场景
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xaaaaaa)
      // 创建一个视角
      const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 150
      // 创建一个渲染器，并插入到文档中
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.getElementById('demo-04').appendChild(renderer.domElement)
      // 光源
      const createLight = () => {
        const light1 = new THREE.DirectionalLight(0xffffff, 1)
        light1.position.set(-1, 2, 4)
        scene.add(light1)
        const light2 = new THREE.DirectionalLight(0xffffff, 1)
        light2.position.set(-1, -2, 4)
        scene.add(light2)
      }
      createLight()

      const objects = []
      const spread = 15
      const addObject = (x, y, obj) => {
        obj.position.x = x * spread
        obj.position.y = y * spread
        scene.add(obj)
        objects.push(obj)
      }

      // 创建材质
      const createMaterial = () => {
        const material = new THREE.MeshPhongMaterial({
          color: 0x156289,
          emissive: 0x072534,
          side: THREE.DoubleSide,
          flatShading: true
        })

        const hue = Math.random()
        const saturation = 1
        const luminance = 0.5
        material.color.setHSL(hue, saturation, luminance)

        return material
      }

      // 创建几何图形
      const addSolidGeometry = (x, y, geometry) => {
        const mesh = new THREE.Mesh(geometry, createMaterial())
        addObject(x, y, mesh)
      }

      // 创建线性图形
      const addLineGeometry = (x, y, geometry) => {
        const material = new THREE.LineBasicMaterial({ color: 0x000000 })
        const mesh = new THREE.LineSegments(geometry, material)
        addObject(x, y, mesh)
      }

      // 立方体
      addSolidGeometry(-2, 2, new THREE.BoxBufferGeometry(8, 8, 8))
      // 圆
      addSolidGeometry(-1, 2, new THREE.CircleBufferGeometry(7, 24))
      // 锥
      addSolidGeometry(0, 2, new THREE.ConeBufferGeometry(6, 8, 16))
      // 柱
      addSolidGeometry(1, 2, new THREE.CylinderBufferGeometry(4, 4, 8, 12))
      // 十二面体
      addSolidGeometry(2, 2, new THREE.DodecahedronBufferGeometry(7))
      // 二十面体
      addSolidGeometry(-2, 1, new THREE.IcosahedronBufferGeometry(7))
      // 八面体
      addSolidGeometry(-1, 1, new THREE.OctahedronBufferGeometry(7))
      // 平面
      addSolidGeometry(0, 1, new THREE.PlaneBufferGeometry(9, 9, 2, 2))
      // 2D圆环
      addSolidGeometry(1, 1, new THREE.RingBufferGeometry(2, 7, 18))
      // 球
      addSolidGeometry(2, 1, new THREE.SphereBufferGeometry(7, 12, 8))
      // 四面体
      addSolidGeometry(-2, 0, new THREE.TetrahedronBufferGeometry(7))
      // 3D圆环
      addSolidGeometry(-1, 0, new THREE.TorusBufferGeometry(5, 2, 8, 24))
      // 3D圆环结
      addSolidGeometry(0, 0, new THREE.TorusKnotBufferGeometry(3.5, 1.5, 8, 64, 2, 3))
      // 边框
      addLineGeometry(1, 0, new THREE.EdgesGeometry(new THREE.BoxBufferGeometry(8, 8, 8)))
      // 线框
      addLineGeometry(2, 0, new THREE.WireframeGeometry(new THREE.BoxBufferGeometry(8, 8, 8)))
      {
        const shape = new THREE.Shape()
        const x = -2.5
        const y = -5
        shape.moveTo(x + 2.5, y + 2.5)
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y)
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5)
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5)
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5)
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y)
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5)

        const extrudeSettings = {
          steps: 2,
          depth: 2,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 1,
          bevelSegments: 2
        }
        // 心形
        addSolidGeometry(-2, -1, new THREE.ExtrudeBufferGeometry(shape, extrudeSettings))
      }
      {
        const points = []
        for (let i = 0; i < 10; ++i) {
          points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * 0.8))
        }
        addSolidGeometry(-1, -1, new THREE.LatheBufferGeometry(points))
      }
      {
        const klein = (v, u, target) => {
          u *= Math.PI
          v *= 2 * Math.PI
          u = u * 2

          let x
          let z

          if (u < Math.PI) {
            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + 2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v)
            z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v)
          } else {
            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + 2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI)
            z = -8 * Math.sin(u)
          }

          const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v)

          target.set(x, y, z).multiplyScalar(0.75)
        }
        // 参数体
        addSolidGeometry(0, -1, new THREE.ParametricBufferGeometry(klein, 26, 25))
      }
      {
        const verticesOfCube = [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1]
        const indicesOfFaces = [2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4]
        const radius = 7
        const detail = 2
        // 多面体
        addSolidGeometry(1, -1, new THREE.PolyhedronBufferGeometry(verticesOfCube, indicesOfFaces, radius, detail))
      }
      {
        const shape = new THREE.Shape()
        const x = -2.5
        const y = -5
        shape.moveTo(x + 2.5, y + 2.5)
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y)
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5)
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5)
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5)
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y)
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5)
        addSolidGeometry(2, -1, new THREE.ShapeBufferGeometry(shape))
      }
      {
        const loader = new THREE.FontLoader()
        loader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', (font) => {
          const geometry = new THREE.TextBufferGeometry('three.js', {
            font,
            size: 3.0,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.15,
            bevelSize: 0.3,
            bevelSegments: 5
          })
          const mesh = new THREE.Mesh(geometry, createMaterial())
          geometry.computeBoundingBox()
          geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1)

          const parent = new THREE.Object3D()
          parent.add(mesh)

          addObject(-1, -2, parent)
        })
      }
      {
        class CustomSinCurve extends THREE.Curve {
          constructor(scale) {
            super()
            this.scale = scale
          }

          getPoint(t) {
            const tx = t * 3 - 1.5
            const ty = Math.sin(2 * Math.PI * t)
            const tz = 0
            return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale)
          }
        }

        const path = new CustomSinCurve(4)
        const tubularSegments = 20
        const radius = 1
        const radialSegments = 8
        const closed = false
        addSolidGeometry(1, -2, new THREE.TubeBufferGeometry(path, tubularSegments, radius, radialSegments, closed))
      }

      const resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
          renderer.setSize(width, height, false)
        }
        return needResize
      }

      const render = (time) => {
        time *= 0.001

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }
        objects.forEach((obj, ndx) => {
          const speed = 0.1 + ndx * 0.05
          const rot = time * speed
          obj.rotation.x = rot
          obj.rotation.y = rot
        })

        renderer.render(scene, camera)

        requestAnimationFrame(render)
      }

      requestAnimationFrame(render)
    }
  }
}
</script>
