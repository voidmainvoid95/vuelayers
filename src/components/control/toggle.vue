<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;">
    <i ref="icon">
      <slot>
        <FontAwesomeIcon icon="bars" />
      </slot>
    </i>
  </i>
</template>

<script>
  import olCmp from '../../mixins/ol-cmp'
  import Toggle from 'ol-ext/control/Toggle'
  import { mergeDescriptors } from '../../utils'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faBars } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  library.add(faBars)

  export default {
    name: 'VlToggle',
    components: {
      FontAwesomeIcon,
    },
    mixins: [
      olCmp,
    ],
    created () {
      this::defineServices()
    },
    mounted () {
      console.log(this.$slots.default)
    },
    methods: {
      createOlObject () {
        return new Toggle({
          html: this.$refs.icon,
          className: 'menu',
          title: 'Menu',
          onToggle: () => { this.$emit('toggle') },
        })
      },
      resolveControlToggle: olCmp.methods.resolveOlObject,
      async mount () {
        this.$controlsContainer?.addControl(this.$controlToggle)

        return this::olCmp.methods.mount()
      },
      /**
       * @return {Promise<void>}
       * @protected
       */
      async unmount () {
        return this::olCmp.methods.unmount()
      },
      getServices () {
        const vm = this
        return mergeDescriptors(
          this::olCmp.methods.getServices(),
          {
            get controlMenuVm () { return vm },
          },
        )
      },
    },
  }

  function defineServices () {
    Object.defineProperties(this, {
      $controlToggle: {
        enumerable: true,
        get: () => this.$olObject,
      },
      $controlsContainer: {
        enumerable: true,
        get: () => this.$services?.controlsContainer,
      },
    })
  }

</script>

<style scoped>
</style>
