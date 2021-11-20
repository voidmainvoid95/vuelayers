<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Teleport from 'ol-ext/featureanimation/Teleport'
  import featureAnimation from '../../mixins/feature-animation'
  export default {
    name: 'VlFeatureAnimationTeleport',
    mixins: [
      featureAnimation,
    ],
    methods: {
      createFeatureAnimation () {
        return new Teleport({
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
