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
    name: 'VlFeatureAnimationPulse',
    mixins: [
      featureAnimation,
    ],
    props: {
      bounce: {
        type: Number,
        default: 5,
      },
    },
    created () {
      this.currentEasing = this.easing || function (t) {
        const a = (2 * this.bounce + 1) * Math.PI / 2
        const b = -0.01
        const c = -Math.cos(a) * Math.pow(2, b)
        t = 1 - Math.cos(t * Math.PI / 2)
        return (1 + Math.abs(Math.cos(a * t)) * Math.pow(2, b * t) + c * t) / 2
      }.bind(this)
      this.currentDuration = this.duration || 3000
    },
    methods: {
      createFeatureAnimation () {
        return new Zoom({
          duration: this.currentDuration,
          reverse: this.currentReverse,
          repeat: this.currentRepeat,
          fade: this.currentFade,
          easing: this.currentEasing,
        })
      },
    },
  }
</script>

<style scoped>

</style>
