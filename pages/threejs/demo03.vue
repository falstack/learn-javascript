<template>
  <canvas id="demo-03"></canvas>
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
      // 想象一个空间
      const scene = new THREE.Scene()
      // 想象一张画布
      const canvas = document.getElementById('demo-03')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const fov = 75 // 视角竖直方向的角度（眼镜的开口角度）
      const aspect = window.innerWidth / window.innerHeight // 画布的宽：画布的高
      const near = 0.1 // 近处（距离视角 camera 0.1 以下的对不渲染）
      const far = 5 // 远处（距离视角 camera 5 以上的对不渲染）
      // 想象一个观测点
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      camera.position.z = 2
      // 方向灯（想象一个光源）
      const light = new THREE.DirectionalLight(0xffffff, 1)
      light.position.set(-1, 2, 4)
      scene.add(light)

      const makeInstance = (color, x) => {
        // MeshPhongMaterial 这种材质受光影响
        const material = new THREE.MeshPhongMaterial({ color })
        const geometry = new THREE.BoxGeometry(1, 1, 1)

        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)

        cube.position.x = x

        return cube
      }

      // 想象三个几何体
      const cubes = [makeInstance(0x44aa88, 0), makeInstance(0x8844aa, -2), makeInstance(0xaa8844, 2)]

      const renderer = new THREE.WebGLRenderer({ canvas })

      /**
       * 当 canvas 的宽高和 canvas 展示的宽高（类似于图片本身的宽高和展示的宽高）不同时，就 reset 它
       * @param renderer
       * @returns {boolean}
       */
      const resizeRendererToDisplaySize = renderer => {
        const canvas = renderer.domElement
        const pixelRatio = window.devicePixelRatio
        const width = (canvas.clientWidth * pixelRatio) | 0
        const height = (canvas.clientHeight * pixelRatio) | 0
        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
          /**
           * setSize 第三个参数默认为 true，会设置 canvas 的尺寸，在这个地方我们不希望它去改变它
           */
          renderer.setSize(width, height, false)
        }
        return needResize
      }

      // 持续投影开始
      const render = time => {
        time *= 0.001 // convert time to seconds

        cubes.forEach((cube, ndx) => {
          const speed = 1 + ndx * 0.1
          const rot = time * speed
          cube.rotation.x = rot
          cube.rotation.y = rot
        })
        if (resizeRendererToDisplaySize(renderer)) {
          // 响应式的更新尺寸
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }

        renderer.render(scene, camera)
        requestAnimationFrame(render)
      }

      // 全投影开始
      requestAnimationFrame(render)
    }
  }
}
</script>
