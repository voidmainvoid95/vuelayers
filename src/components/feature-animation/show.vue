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
      /**
       * Create Show
       * @return {module:ol-ext/featureAnimation/Show~Show}
       * @protected
       */
      createFeatureAnimation () {
        return new Show({
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
