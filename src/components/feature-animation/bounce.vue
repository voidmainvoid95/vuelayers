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
      /**
       * Create Bounce
       * @return {module:ol-ext/featureAnimation/Bounce~Bounce}
       * @protected
       */
      createFeatureAnimation () {
        return new Bounce({
          duration: this.duration,
          reverse: this.reverse,
          repeat: this.repeat,
          fade: this.fade,
          easing: this.easing,
          bounce: this.currentBounce,
          amplitude: this.currentAmplitude,
        })
      },
    },
  }
</script>

<style scoped>

</style>
