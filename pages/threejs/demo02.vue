<template>
  <div id="demo-02"></div>
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
        45,
        window.innerWidth / window.innerHeight,
        1,
        500
      )
      camera.position.set(0, 0, 100)
      camera.lookAt(0, 0, 0)
      // 创建一个渲染器，并插入到文档中
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.getElementById('demo-02').appendChild(renderer.domElement)
      // 创建一个材质对象
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
      // 创建一个几何体
      const geometry = new THREE.Geometry()
      // 绘制三个向量（点？）
      geometry.vertices.push(new THREE.Vector3(-10, 0, 0))
      geometry.vertices.push(new THREE.Vector3(0, 10, 0))
      geometry.vertices.push(new THREE.Vector3(10, 0, 0))
      // 线条（点，材质）
      const line = new THREE.Line(geometry, material)
      // 将物体添加到场景中，默认会在（0, 0, 0）坐标，视角（camera）也在这个坐标
      scene.add(line)
      renderer.render(scene, camera)
    }
  }
}
</script>
