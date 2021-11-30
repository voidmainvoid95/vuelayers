import { Control } from 'ol/control'
import { getControlId, initializeControl } from '../ol-ext'
import { instanceOf, mergeDescriptors } from '../utils'
import control from './control'
import { makeChangeOrRecreateWatchers } from './ol-cmp'

export default {
  mixins: [
    control,
  ],
  props: {
    title: String,
    disable: {
      type: Boolean,
      default: false,
    },
    autoActive: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    title () {
      this.$control.setTitle(this.title)
    },
    disable () {
      this.$control.setDisable(this.disable)
    },
    .../*#__PURE__*/makeChangeOrRecreateWatchers([
      'autoActive',
    ]),
  },
  created () {
    this._controlBar = undefined
  },
  methods: {
    /**
     * Create Toggle
     * @return {module:ol-ext/control/Toggle~Toggle}
     * @protected
     * @abstract
     */
    createToggle () {
      throw new Error(`${this.vmName} not implemented method: createToggle()`)
    },
    createControl () {
      return this.createToggle()
    },
    /**
     * @return {Promise<Toggle>}
     */
    resolveToggle: control.methods.resolveControl,
    /**
     * @param {ControlBarLike} controlBar
     * @return {Control}
     */
    initializeControlBar (controlBar) {
      controlBar = controlBar?.$control || controlBar
      instanceOf(controlBar, Control)

      return initializeControl(controlBar)
    },
    /**
     * @param {ControlBarLike} controlBar
     */
    setSubBar (controlBar) {
      if (controlBar) {
        controlBar = this.initializeControlBar(controlBar)
        if (this._controlBar) { if (getControlId(controlBar) === getControlId(this._controlBar)) return }
      }

      this.$control.setSubBar(controlBar)
      this._controlBar = controlBar
    },
    /**
     * @returns {module:ol-ext/control/Bar~Bar}
     */
    getSubBar () {
      return this._controlBar
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
          get controlBarContainer () { return vm },
          get controlToggleVm () { return vm },
        },
      )
    },
  },
}
