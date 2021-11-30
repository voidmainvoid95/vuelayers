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
      /**
       * Create Toggle
       * @return {module:ol-ext/control/Toggle~Toggle}
       * @protected
       */
      createToggle () {
        return new Toggle({
          html: this.$el,
          className: this.className,
          title: this.title,
          active: this.active,
          disable: this.disable,
          autoActive: this.autoActive,
          onToggle: (event) => { this.$emit('toggle', event) },
        })
      },
    },
  }
</script>
