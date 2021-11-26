<template>
  <i
    :id="vmId"
    :class="vmClass" />
</template>

<script>
  import { FullScreen } from 'ol/control'
  import { control } from '../../mixins'

  export default {
    name: 'VlFullScreen',
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
          'ol-full-screen',
        ]
      },
    },
    methods: {
      createControl () {
        return new FullScreen({
          className: this.classes.join('.').substring(1),
        })
      },
    },
  }
</script>

<style scoped>

</style>
