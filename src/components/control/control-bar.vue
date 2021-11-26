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
  import { Control } from 'ol/control'
  import { control } from '../../mixins'
  import { getControlId, initializeControl } from '../../ol-ext'
  import { find, forEach, instanceOf, mergeDescriptors } from '../../utils'

  export default {
    name: 'VlControlBar',
    mixins: [
      control,
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
      this._controls = []

      this::defineServices()
    },
    methods: {
      createControl () {
        const bar = new Bar({
          className: this.classes.join(' '),
          controls: this._controls,
        })
        bar.setPosition(this.position)
        return bar
      },
      /**
       * @param {ControlLike} control
       * @return {Control}
       */
      initializeControl (control) {
        control = control?.$control || control
        instanceOf(control, Control)

        return initializeControl(control)
      },
      /**
       * @param {ControlLike[]|module:ol/Collection~Collection<ControlLike>} controls
       */
      addControls (controls) {
        forEach(controls, ::this.addControl)
      },
      addControl (control) {
        control = this.initializeControl(control)
        if (this.getControlById(getControlId(control))) return

        this.$control.addControl(control)
      },
      /**
       * @param {ControlLike[]|module:ol/Collection~Collection<ControlLike>} controls
       */
      removeControls (controls) {
        forEach(controls, ::this.removeControl)
      },
      /**
       * @param {ControlLike} control
       */
      removeControl (control) {
        control = this.getControlById(getControlId(control?.$control || control))
        if (!control) return

        this._controls = this.getControls().filter(item => getControlId(control) !== getControlId(item))
        this.scheduleRecreate()
      },
      /**
       * @return {void}
       */
      clearControls () {
        this._controls = []
        this.scheduleRecreate()
      },
      /**
       * @returns {Array<module:ol/control/Control~Control>}
       */
      getControls () {
        return this.$control.getControls()
      },
      /**
       * @param {string|number} controlId
       * @returns {ControlLike}
       */
      getControlById (controlId) {
        return find(this.getControls(), control => getControlId(control) === controlId)
      },
      /**
       * @return {Object}
       * @protected
       */
      getServices () {
        const vm = this
        return mergeDescriptors(
          this::control.methods.getServices(),
          {
            get controlsContainer () { return vm },
          },
        )
      },
    },
  }

  function defineServices () {
    Object.defineProperties(this, {
      $controlsCollection: {
        enumerable: true,
        get: this.$control,
      },
    })
  }
</script>

<style scoped>

</style>
