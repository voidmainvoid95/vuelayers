<template>
  <i
    :id="vmId"
    :class="vmClass">
    <slot />
  </i>
</template>

<script>
  import Toggle from 'ol-ext/control/Toggle'
  import { controlToggle } from '../../mixins'

  export default {
    name: 'VlControlToggle',
    mixins: [
      controlToggle,
    ],
    methods: {
      createControl () {
        return new Toggle({
          html: this.$el,
          className: this.className,
          title: this.currentTitle,
          onToggle: (event) => { this.$emit('toggle', event) },
        })
      },
    },
  }
</script>

<style scoped>
</style>
