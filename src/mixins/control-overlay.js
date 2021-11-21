import olCmp from './ol-cmp'
import { mergeDescriptors } from '../utils'
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
  data () {
    return {
      currentCloseBox: true,
      currentClassName: 'slide-left menu',
      currentHideOnClick: false,
    }
  },
  created () {
    this::defineServices()
  },
  methods: {
    /**
     * Create OverlayMenu
     * @return {module:ol-ext/control/Overlay~Overlay}
     * @protected
     */
    createOlObject () {
      return this.createControlOverlay()
    },
    /**
     * @return {Promise<Overlay>}
     */
    resolveOverlayMenu: olCmp.methods.resolveOlObject,
    async mount () {
      this.$controlsContainer?.addControl(this.$overlayMenu)

      return this::olCmp.methods.mount()
    },
    /**
     * @return {Promise<void>}
     * @protected
     */
    async unmount () {
      return this::olCmp.methods.unmount()
    },
    /**
     * @return {Object}
     * @protected
     */
    /**
     * @return {Object}
     * @protected
     */
    getServices () {
      const vm = this
      return mergeDescriptors(
        this::olCmp.methods.getServices(),
        {
          get overlayMenuVm () { return vm },
        },
      )
    },
  },
}

function defineServices () {
  Object.defineProperties(this, {
    $overlayMenu: {
      enumerable: true,
      get: () => this.$olObject,
    },
    $controlsContainer: {
      enumerable: true,
      get: () => this.$services?.controlsContainer,
    },
  })
}
