import { mergeDescriptors } from '../utils'
import controlButton from './control-button'

export default {
  mixins: [
    controlButton,
  ],
  created () {
    this::defineServices()
  },
  mounted () {
    this.currentClassName = `${this.$el.className} ${this.currentClassName} ol-toggle`
  },
  methods: {
    /**
     * Create Toggle
     * @return {module:ol-ext/control/Toggle~Toggle}
     * @protected
     */
    async createOlObject () {
      return this.createToggle()
    },
    /**
     * @return {Promise<Toggle>}
     */
    resolveToggle: controlButton.methods.resolveButton,
    /**
     * @return {Object}
     * @protected
     */
    getServices () {
      const vm = this
      return mergeDescriptors(
        this::controlButton.methods.getServices(),
        {
          get controlToggleVm () { return vm },
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
  })
}
