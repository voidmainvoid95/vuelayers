<template>
  <i
    :id="vmId"
    :class="vmClass" />
</template>

<script>
  import { ZoomSlider } from 'ol/control'
  import { control } from '../../mixins'

  export default {
    name: 'VlZoomSlider',
    mixins: [
      control,
    ],
    props: {
      duration: {
        type: Number,
        default: 250,
      },
    },
    computed: {
      classes () {
        return [
          this.className,
          this.vmClass,
          'ol-zoomslider',
        ]
      },
    },
    methods: {
      createControl () {
        return new ZoomSlider({
          className: this.classes.join(' '),
          duration: this.duration,
        })
      },
    },
  }
</script>

<style scoped>

</style>
