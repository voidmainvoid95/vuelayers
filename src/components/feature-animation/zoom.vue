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
          duration: this.currentDuration,
          reverse: this.currentReverse,
          repeat: this.currentRepeat,
          fade: this.currentFade,
          easing: this.currentEasing,
          zoomOut: this.currentZoomOut,
        })
      },
    },
  }
</script>

<style scoped>

</style>
