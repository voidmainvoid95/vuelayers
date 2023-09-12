<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Throw from 'ol-ext/featureanimation/Throw'
  import { featureAnimation } from '../../mixins'

  export default {
    name: 'VlFeatureAnimationThrow',
    mixins: [
      featureAnimation,
    ],
    props: {
      right: {
        type: Boolean,
      },
    },
    data () {
      return {
        currentSide: false,
      }
    },
    created () {
      this.currentSide = this.right || this.currentSide
    },
    methods: {
      /**
       * Create Throw
       * @return {module:ol-ext/featureAnimation/Throw~Throw}
       * @protected
       */
      createFeatureAnimation () {
        return new Throw({
          duration: this.duration,
          reverse: this.reverse,
          repeat: this.repeat,
          fade: this.fade,
          easing: this.easing,
          side: this.currentSide,
        })
      },
    },
  }
</script>

<style scoped>

</style>
