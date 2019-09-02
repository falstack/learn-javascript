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
      const scene = new THREE.Scene()
      const canvas = document.getElementById('demo-03')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const renderer = new THREE.WebGLRenderer({ canvas })
      const fov = 75 // 视角的角度（眼镜的开口角度）
      const aspect = window.innerWidth / window.innerHeight // 大概就是 far / far处的画布宽度 = 2
      const near = 0.1 // 近处（距离视角 camera 0.1 以下的对不渲染）
      const far = 5 // 远处（距离视角 camera 5 以上的对不渲染）
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      camera.position.z = 2
      const boxWidth = 1
      const boxHeight = 1
      const boxDepth = 1
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
      const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 })
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)
      renderer.render(scene, camera)
    }
  }
}
</script>
