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
    active: {
      type: Boolean,
      default: false,
    },
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
    .../*#__PURE__*/makeChangeOrRecreateWatchers([
      'active',
      'disable',
      'autoActive',
    ]),
  },
  created () {
    this._controlBar = undefined

    console.log('TOGGLE', this)
  },
  methods: {
    /**
     * @return {Promise<Toggle>}
     */
    resolveToggle: control.methods.resolveControl,
    /**
     * @return {Promise<void>}
     * @protected
     */
    async mount () {
      return this::control.methods.mount()
    },
    /**
     * @return {Promise<void>}
     * @protected
     */
    async unmount () {
      return this::control.methods.unmount()
    },
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
      controlBar = this.initializeControlBar(controlBar)

      if (this._controlBar) { if (getControlId(controlBar) === getControlId(this._controlBar)) return }

      this.$control.setSubBar(controlBar)
      this._controlBar = controlBar
    },
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
