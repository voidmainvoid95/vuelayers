<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Drop from 'ol-ext/featureanimation/Drop'
  import { featureAnimation } from '../../mixins'

  export default {
    name: 'VlFeatureAnimationDrop',
    mixins: [
      featureAnimation,
    ],
    props: {
      speed: {
        type: Number,
      },
      side: {
        type: Number,
      },
    },
    data () {
      return {
        currentSpeed: 0,
        currentSide: 0,
      }
    },
    methods: {
      /**
       * Create Drop
       * @return {module:ol-ext/featureAnimation/Drop~Drop}
       * @protected
       */
      createFeatureAnimation () {
        return new Drop({
          duration: this.duration,
          reverse: this.reverse,
          repeat: this.repeat,
          fade: this.fade,
          easing: this.easing,
          side: this.currentSide,
          speed: this.currentSpeed,
        })
      },
    },
  }
</script>

<style scoped>

</style>
