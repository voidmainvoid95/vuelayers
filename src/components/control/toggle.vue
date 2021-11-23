<template>
  <i
    :id="vmId"
    style="display: none!important;">
    <i ref="toggle">
      <slot name="icon" />
    </i>
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
          html: this.$refs.toggle,
          className: this.currentClassName,
          title: this.currentTitle,
          onToggle: () => { this.$emit('toggle') },
        })
      },
    },
  }
</script>

<style scoped>
</style>
