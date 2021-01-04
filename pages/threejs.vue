<template>
  <div id="threejs">
    <nuxt-child />
  </div>
</template>

<script>
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
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
#threejs {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
