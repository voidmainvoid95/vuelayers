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
      createFeatureAnimation () {
        return new Throw({
          duration: this.currentDuration,
          reverse: this.currentReverse,
          repeat: this.currentRepeat,
          fade: this.currentFade,
          easing: this.currentEasing,
          side: this.currentSide,
        })
      },
    },
  }
</script>

<style scoped>

</style>
