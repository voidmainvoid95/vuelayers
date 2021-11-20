<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Drop from 'ol-ext/featureanimation/Drop'
  import animation from '../../mixins/feature-animation'
  export default {
    name: 'VlFeatureAnimationDrop',
    mixins: [
      animation,
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
      createFeatureAnimation () {
        return new Drop({
          duration: this.currentDuration,
          reverse: this.currentReverse,
          repeat: this.currentRepeat,
          fade: this.currentFade,
          easing: this.currentEasing,
          side: this.currentSide,
          speed: this.currentSpeed,
        })
      },
    },
  }
</script>

<style scoped>

</style>
