import { mergeDescriptors } from '../utils'
import controlButton from './control-button'

export default {
  mixins: [
    controlButton,
  ],
  mounted () {
    this.currentClassName = `${this.$el.className} ${this.currentClassName} ol-toggle`
  },
  methods: {
    /**
     * Create Toggle
     * @return {module:ol-ext/control/Toggle~Toggle}
     * @protected
     */
    createButton () {
      return this.createToggle()
    },
    /**
     * @return {Promise<Toggle>}
     */
    resolveToggle: controlButton.methods.resolveButton,
    /**
     * @return {Promise<void>}
     * @protected
     */
    async mount () {
      return this::controlButton.methods.mount()
    },
    /**
     * @return {Promise<void>}
     * @protected
     */
    async unmount () {
      return this::controlButton.methods.unmount()
    },
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
