<template>
  <i
    style="display: none!important;">
    <ControlZoom />
    <ControlRotate />
    <ControlAttribution />
  </i>
</template>

<script>
  import ControlZoom from './zoom.vue'
  import ControlRotate from './rotate.vue'
  import ControlAttribution from './attribution.vue'

  export default {
    name: 'VlControlDefault',
    components: {
      ControlZoom,
      ControlRotate,
      ControlAttribution,
    },
  }
</script>

<style scoped>

</style>
