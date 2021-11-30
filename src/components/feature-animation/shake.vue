<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Shake from 'ol-ext/featureanimation/Shake'
  import { featureAnimation } from '../../mixins'

  export default {
    name: 'VlFeatureAnimationShake',
    mixins: [
      featureAnimation,
    ],
    props: {
      bounce: {
        type: Number,
      },
      amplitude: {
        type: Number,
      },
      horizontal: {
        type: Boolean,
      },
    },
    data () {
      return {
        currentBounce: 6,
        currentAmplitude: 40,
        currentHorizontal: false,
      }
    },
    created () {
      this.currentBounce = this.bounce || this.currentBounce
      this.currentAmplitude = this.amplitude || this.currentAmplitude
      this.currentHorizontal = this.horizontal || this.currentHorizontal
    },
    methods: {
      /**
       * Create Shake
       * @return {module:ol-ext/featureAnimation/Shake~Shake}
       * @protected
       */
      createFeatureAnimation () {
        return new Shake({
          duration: this.duration,
          reverse: this.reverse,
          repeat: this.repeat,
          fade: this.fade,
          easing: this.easing,
          bounce: this.currentBounce,
          amplitude: this.currentAmplitude,
          horizontal: this.currentHorizontal,
        })
      },
    },
  }
</script>

<style scoped>

</style>
