<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import None from 'ol-ext/featureanimation/None'
  import { featureAnimation } from '../../mixins'

  export default {
    name: 'VlFeatureAnimationNone',
    mixins: [
      featureAnimation,
    ],
    methods: {
      /**
       * Create None
       * @return {module:ol-ext/featureAnimation/None~None}
       * @protected
       */
      createFeatureAnimation () {
        return new None({
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
