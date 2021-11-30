import { mergeDescriptors } from '../utils'
import olCmp, { makeChangeOrRecreateWatchers } from './ol-cmp'
import stubVNode from './stub-vnode'

export default {
  mixins: [
    stubVNode,
    olCmp,
  ],
  stubVNode: {
    empty: false,
    attrs () {
      return {
        id: this.vmId,
        class: this.vmClass,
      }
    },
  },
  props: {
    className: String,
    active: {
      type: Boolean,
      default: false,
    },
  },
  created () {
    this::defineServices()
  },
  watch: {
    active () {
      this.$control.setActive(this.active)
    },
    .../*#__PURE__*/makeChangeOrRecreateWatchers([
      'className',
    ]),
  },
  methods: {
    /**
     * Create Control
     * @return {module:ol/control/Control~Control}
     * @protected
     * @abstract
     */
    createControl () {
      throw new Error(`${this.vmName} not implemented method: createControl()`)
    },
    createOlObject () {
      return this.createControl()
    },
    /**
     * @return {Promise<Control>}
     */
    resolveControl: olCmp.methods.resolveOlObject,
    /**
     * @return {Promise<void>}
     * @protected
     */
    async mount () {
      this.$controlsContainer?.addControl(this)

      return this::olCmp.methods.mount()
    },
    /**
     * @return {Promise<void>}
     * @protected
     */
    async unmount () {
      this.$controlsContainer?.removeControl(this.$control)

      return this::olCmp.methods.unmount()
    },
    /**
     * @return {Object}
     * @protected
     */
    getServices () {
      const vm = this
      return mergeDescriptors(
        this::olCmp.methods.getServices(),
        {
          get controlVm () { return vm },
        },
      )
    },
  },
}

function defineServices () {
  Object.defineProperties(this, {
    $control: {
      enumerable: true,
      get: () => this.$olObject,
    },
    $controlsContainer: {
      enumerable: true,
      get: () => this.$services?.controlsContainer,
    },
  })
}
