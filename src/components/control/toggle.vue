<template>
  <i
    :id="vmId"
    :class="vmClass">
    <slot />
  </i>
</template>

<script>
  import Toggle from 'ol-ext/control/Toggle'
  import controlToggle from '../../mixins/control-toggle'
  export default {
    name: 'VlControlToggle',
    mixins: [
      controlToggle,
    ],
    methods: {
      createToggle () {
        return new Toggle({
          html: this.$el,
          className: this.classes.join(' '),
          title: this.currentTitle,
          onToggle: () => { this.$emit('toggle') },
        })
      },
    },
  }
</script>

<style scoped>
</style>
