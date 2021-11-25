<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Slide from 'ol-ext/featureanimation/Slide'
  import { featureAnimation } from '../../mixins'

  export default {
    name: 'VlFeatureAnimationSlide',
    mixins: [
      featureAnimation,
    ],
    methods: {
      createFeatureAnimation () {
        return new Slide({
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
