<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Fade from 'ol-ext/featureanimation/Fade'
  import featureAnimation from '../../mixins/feature-animation'
  export default {
    name: 'VlFeatureAnimationFade',
    mixins: [
      featureAnimation,
    ],
    methods: {
      createFeatureAnimation () {
        return new Fade({
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
