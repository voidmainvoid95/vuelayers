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
      /**
       * Create Pulse
       * @return {module:ol-ext/featureAnimation/Pulse~Pulse}
       * @protected
       */
      createFeatureAnimation () {
        return new Zoom({
          duration: this.duration,
          reverse: this.reverse,
          repeat: this.repeat,
          fade: this.fade,
          easing: this.easing,
        })
      },
    },
  }
</script>

<style scoped>

</style>
