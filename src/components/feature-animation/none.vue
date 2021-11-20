<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import None from 'ol-ext/featureanimation/None'
  import featureAnimation from '../../mixins/feature-animation'
  export default {
    name: 'VlFeatureAnimationNone',
    mixins: [
      featureAnimation,
    ],
    methods: {
      createFeatureAnimation () {
        return new None({
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
