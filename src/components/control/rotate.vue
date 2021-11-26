<template>
  <i
    :id="vmId"
    :class="vmClass" />
</template>

<script>
  import { Rotate } from 'ol/control'
  import { control } from '../../mixins'

  export default {
    name: 'VlRotate',
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
          'ol-rotate',
        ]
      },
    },
    methods: {
      createControl () {
        return new Rotate({
          className: this.classes.join(' '),
          duration: this.duration,
          autoHide: false,
        })
      },
    },
  }
</script>

<style scoped>

</style>
