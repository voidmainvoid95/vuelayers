<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Path from 'ol-ext/featureanimation/Path'
  import { featureAnimation } from '../../mixins'

  export default {
    name: 'VlFeatureAnimationPath',
    mixins: [
      featureAnimation,
    ],
    props: {
      speed: {
        type: Number,
      },
      rotate: {
        type: Boolean,
      },
      path: {
        type: Object,
      },
    },
    data () {
      return {
        currentSpeed: 0,
        currentRotate: false,
        currentPath: undefined,
      }
    },
    created () {
      this.currentSpeed = this.speed || this.currentSpeed
      this.currentRotate = this.rotate || this.currentRotate
      this.currentPath = this.path || this.currentPath
    },
    methods: {
      createFeatureAnimation () {
        return new Path({
          duration: this.currentDuration,
          reverse: this.currentReverse,
          repeat: this.currentRepeat,
          fade: this.currentFade,
          easing: this.currentEasing,
          speed: this.currentSpeed,
          rotate: this.currentRotate,
          path: this.currentPath,
        })
      },
    },
  }
</script>

<style scoped>

</style>
