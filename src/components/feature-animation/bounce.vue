<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Bounce from 'ol-ext/featureanimation/Bounce'
  import { featureAnimation } from '../../mixins'

  export default {
    name: 'VlFeatureAnimationBounce',
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
    },
    data () {
      return {
        currentBounce: 3,
        currentAmplitude: 40,
      }
    },
    created () {
      this.currentBounce = this.bounce || this.currentBounce
      this.currentAmplitude = this.amplitude || this.currentAmplitude
    },
    methods: {
      createFeatureAnimation () {
        return new Bounce({
          duration: this.currentDuration,
          reverse: this.currentReverse,
          repeat: this.currentRepeat,
          fade: this.currentFade,
          easing: this.currentEasing,
          bounce: this.currentBounce,
          amplitude: this.currentAmplitude,
        })
      },
    },
  }
</script>

<style scoped>

</style>
