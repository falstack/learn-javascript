<template>
  <div id="demo-01"></div>
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
      // 创建一个视角
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      // 创建一个渲染器，并插入到文档中
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.getElementById('demo-01').appendChild(renderer.domElement)
      // 创建一个立方体
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      // 创建一个材质对象
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      // 网格?
      const cube = new THREE.Mesh(geometry, material)
      // 将物体添加到场景中，默认会在（0, 0, 0）坐标，视角（camera）也在这个坐标
      scene.add(cube)
      // 把视角外移，这样就能看到立方体了
      camera.position.z = 5
      // 真正的开始持续渲染！全投影开始，持续性保持！trace on！
      const animate = () => {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
      }
      animate()
    }
  }
}
</script>
