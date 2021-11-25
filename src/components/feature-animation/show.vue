<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Show from 'ol-ext/featureanimation/Show'
  import { featureAnimation } from '../../mixins'

  export default {
    name: 'VlFeatureAnimationShow',
    mixins: [
      featureAnimation,
    ],
    methods: {
      createFeatureAnimation () {
        return new Show({
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
