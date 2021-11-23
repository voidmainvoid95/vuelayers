import { mergeDescriptors } from '../utils'
import olCmp from './ol-cmp'

export default {
  mixins: [
    olCmp,
  ],
  created () {
    this::defineServices()
  },
  data () {
    return {
      currentClassName: 'ol-control',
      currentTitle: '',
      currentName: '',
    }
  },
  methods: {
    createButton () {
      throw new Error(`${this.vmName} not implemented method: createButton()`)
    },
    /**
     * Create Button
     * @return {module:ol-ext/control/Button~Button}
     * @protected
     */
    async createOlObject () {
      return this.createButton()
    },
    /**
     * @return {Promise<Button>}
     */
    resolveButton: olCmp.methods.resolveOlObject,
    /**
     * @return {Promise<void>}
     * @protected
     */
    async mount () {
      this.$controlsContainer?.addControl(this.$controlButton)

      return this::olCmp.methods.mount()
    },
    /**
     * @return {Promise<void>}
     * @protected
     */
    async unmount () {
      this.$controlsContainer?.removeControl(this.$controlButton)

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
          get controlButtonVm () { return vm },
        },
      )
    },
  },
}

function defineServices () {
  Object.defineProperties(this, {
    $controlButton: {
      enumerable: true,
      get: () => this.$olObject,
    },
    $controlsContainer: {
      enumerable: true,
      get: () => this.$services?.controlsContainer,
    },
  })
}
