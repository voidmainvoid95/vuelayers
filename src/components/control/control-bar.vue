<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none!important;">
    <slot />
  </i>
</template>

<script>
  import Bar from 'ol-ext/control/Bar'
  import { control, controlsContainer } from '../../mixins'
  import olCmp from '../../mixins/ol-cmp'
  import { getControlId } from '../../ol-ext'
  import { mergeDescriptors } from '../../utils'

  export default {
    name: 'VlControlBar',
    mixins: [
      control,
      controlsContainer,
    ],
    props: {
      position: {
        type: String,
        default: 'top',
      },
    },
    computed: {
      classes () {
        return [
          this.className,
          this.vmClass,
          'ol-control-bar',
        ]
      },
    },
    watch: {
      position () {
        this.$control.setPosition(this.position)
      },
    },
    created () {
      this::defineServices()
    },
    methods: {
      createControl () {
        const bar = new Bar({
          className: this.classes.join(' '),
          controls: this.getControls(),
        })
        bar.setPosition(this.position)
        return bar
      },
      addControl (control) {
        control = this.initializeControl(control)

        if (this.getControlById(getControlId(control))) return

        this.$control.addControl(control)
        this.$controlsCollection.push(control)
      },
      /**
       * @param {ControlLike} control
       */
      removeControl (control) {
        control = this.getControlById(getControlId(control?.$control || control))

        if (!control) return

        this.$controlsCollection.remove(control)
        this.scheduleRecreate()
      },
      /**
       * @return {void}
       */
      clearControls () {
        this.$controlsCollection.clear()
        this.scheduleRecreate()
      },
      /**
       * @return {Promise<void>}
       * @protected
       */
      async mount () {
        if (this.$controlBarContainer) {
          this.$controlBarContainer.setSubBar(this)
        } else {
          this.$controlsContainer?.addControl(this)
        }

        return this::olCmp.methods.mount()
      },
      /**
       * @return {Promise<void>}
       * @protected
       */
      async unmount () {
        if (this.$controlBarContainer) {
          this.$controlBarContainer.setSubBar(undefined)
        } else {
          this.$controlsContainer?.removeControl(this)
        }

        return this::olCmp.methods.unmount()
      },
      /**
       * @return {Object}
       * @protected
       */
      getServices () {
        const vm = this

        return mergeDescriptors(
          this::control.methods.getServices(),
          this::controlsContainer.methods.getServices(),
          {
            get controlBarVm () { return vm },
          },
        )
      },
    },
  }

  function defineServices () {
    Object.defineProperties(this, {
      $controlBarContainer: {
        enumerable: true,
        get: () => this.$services?.controlBarContainer,
      },
    })
  }

</script>

<style scoped>

</style>
