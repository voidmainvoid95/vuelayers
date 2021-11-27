<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Zoom from 'ol-ext/featureanimation/Zoom'
  import { featureAnimation } from '../../mixins'

  export default {
    name: 'VlFeatureAnimationZoom',
    mixins: [
      featureAnimation,
    ],
    props: {
      zoomOut: {
        type: Boolean,
      },
    },
    data () {
      return {
        currentZoomOut: false,
      }
    },
    created () {
      this.currentZoomOut = this.zoomOut || this.currentZoomOut
    },
    methods: {
      createFeatureAnimation () {
        return new Zoom({
          duration: this.duration,
          reverse: this.reverse,
          repeat: this.repeat,
          fade: this.fade,
          easing: this.easing,
          zoomOut: this.currentZoomOut,
        })
      },
    },
  }
</script>

<style scoped>

</style>
