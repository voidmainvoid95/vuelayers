<template>
  <i
    :id="vmId"
    :class="vmClass" />
</template>

<script>
  import { Attribution } from 'ol/control'
  import { control } from '../../mixins'

  export default {
    name: 'VlAttribution',
    mixins: [
      control,
    ],
    computed: {
      classes () {
        return [
          this.className,
          this.vmClass,
          'ol-attribution',
        ]
      },
    },
    methods: {
      /**
       * Create Attribution
       * @return {module:ol/control/Attribution~Attribution}
       * @protected
       */
      createControl () {
        return new Attribution({
          className: this.classes.join(' '),
        })
      },
    },
  }
</script>

<style scoped>

</style>
