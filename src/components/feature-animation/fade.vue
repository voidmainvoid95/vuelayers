<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Fade from 'ol-ext/featureanimation/Fade'
  import { featureAnimation } from '../../mixins'

  export default {
    name: 'VlFeatureAnimationFade',
    mixins: [
      featureAnimation,
    ],
    methods: {
      /**
       * Create Fade
       * @return {module:ol-ext/featureAnimation/Fade~Fade}
       * @protected
       */
      createFeatureAnimation () {
        return new Fade({
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
