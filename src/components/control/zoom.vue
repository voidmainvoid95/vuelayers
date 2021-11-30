<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none!important;" />
</template>

<script>
  import { Zoom } from 'ol/control'
  import { control, makeChangeOrRecreateWatchers } from '../../mixins'

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
    watch: {
      .../*#__PURE__*/makeChangeOrRecreateWatchers([
        'duration',
        'zoomInClassName',
        'zoomOutClassName',
        'zoomInLabel',
        'zoomOutLabel',
        'zoomInTipLabel',
        'zoomOutTipLabel',
        'delta',
      ]),
    },
    methods: {
      /**
       * Create Zoom
       * @return {module:ol/control/Zoom~Zoom}
       * @protected
       */
      createControl () {
        return new Zoom({
          className: this.classes.join(' '),
          duration: this.duration,
          zoomInClassName: this.zoomInClassName,
          zoomOutClassName: this.zoomOutClassName,
          zoomInLabel: this.zoomInLabel,
          zoomOutLabel: this.zoomOutLabel,
          zoomInTipLabel: this.zoomInTipLabel,
          zoomOutTipLabel: this.zoomInTipLabel,
          delta: this.delta,
        })
      },
    },
  }
</script>

<style scoped>

</style>
