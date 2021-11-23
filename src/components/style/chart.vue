<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import { style } from '../../mixins'
  import { Style, Stroke } from 'ol/style'
  import Chart from 'ol-ext/style/Chart'

  export default {
    name: 'VlStyleChart',
    mixins: [
      style,
    ],
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        },
      },
    },
    created () {
      this::defineServices()
    },
    methods: {
      createStyle () {
        return new Style({
          image: new Chart({
            type: 'pie',
            radius: 50,
            data: this.data,
            rotateWithView: true,
            stroke: new Stroke({
              color: '#fff',
              width: 2,
            }),
          }),
        })
      },
      async mount () {
        this.$styleContainer?.setStyle(this)
        return this::style.methods.mount()
      },
      async unmount () {
        return this::style.methods.unmount()
      },
    },
  }
  function defineServices () {
    Object.defineProperties(this, {
      $styleContainer: {
        enumerable: true,
        get: () => this.$services?.styleContainer,
      },
    })
  }

</script>

<style scoped>

</style>
