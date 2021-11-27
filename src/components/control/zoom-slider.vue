<template>
  <i
    :id="vmId"
    :class="vmClass" />
</template>

<script>
  import { ZoomSlider } from 'ol/control'
  import { control, makeChangeOrRecreateWatchers } from '../../mixins'

  export default {
    name: 'VlZoomSlider',
    mixins: [
      control,
    ],
    props: {
      label: String,
      tipLabel: String,
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
    watch: {
      .../*#__PURE__*/makeChangeOrRecreateWatchers([
        'label',
        'tipLabel,',
      ]),
    },
    methods: {
      createControl () {
        return new ZoomSlider({
          className: this.classes.join(' '),
          label: this.label,
          tipLabel: this.tipLabel,
        })
      },
    },
  }
</script>

<style scoped>

</style>
