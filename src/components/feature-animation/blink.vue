<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import Blink from 'ol-ext/featureanimation/Blink'
  import { featureAnimation } from '../../mixins'

  export default {
    name: 'VlFeatureAnimationBlink',
    mixins: [
      featureAnimation,
    ],
    props: {
      nb: {
        type: Number,
      },
    },
    data () {
      return {
        currentNb: 10,
      }
    },
    created () {
      this.currentNb = this.nb || this.currentNb
    },
    methods: {
      createFeatureAnimation () {
        return new Blink({
          duration: this.duration,
          reverse: this.reverse,
          repeat: this.repeat,
          fade: this.fade,
          easing: this.easing,
          nb: this.currentNb,
        })
      },
    },
  }
</script>

<style scoped>

</style>
