<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none!important;" />
</template>

<script>
  import { Zoom } from 'ol/control'
  import { control } from '../../mixins'

  export default {
    name: 'VlZoom',
    mixins: [
      control,
    ],
    props: {
      duration: {
        type: Number,
        default: 250,
      },
      zoomInClassName: String,
      zoomOutClassName: String,
      zoomInLabel: String,
      zoomOutLabel: String,
      zoomInTipLabel: String,
      zoomOutTipLabel: String,
      delta: {
        type: Number,
        default: 1,
      },
    },
    computed: {
      classes () {
        return [
          this.className,
          this.vmClass,
          'ol-zoom',
        ]
      },
    },
    methods: {
      createControl () {
        return new Zoom({
          className: this.classes.join(' '),
          duration: this.duration,
          delta: this.delta,
        })
      },
    },
  }
</script>

<style scoped>

</style>
