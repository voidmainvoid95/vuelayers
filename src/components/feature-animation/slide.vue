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
      /**
       * Create Slide
       * @return {module:ol-ext/featureAnimation/Slide~Slide}
       * @protected
       */
      createFeatureAnimation () {
        return new Slide({
          duration: this.duration,
          reverse: this.reverse,
          repeat: this.repeat,
          fade: this.fade,
          easing: this.easing,
        })
      },
    },
  }
</script>

<style scoped>

</style>
