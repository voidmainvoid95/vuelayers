import { mergeDescriptors } from '../utils'
import control from './control'

export default {
  mixins: [
    control,
  ],
  props: {
    className: String,
  },
  watch: {
    className (newVal, oldVal) {
      this.$control.element.className = this.$control.element.className.replace(oldVal, newVal)
    },
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
     * @return {Object}
     * @protected
     */
    getServices () {
      const vm = this
      return mergeDescriptors(
        this::control.methods.getServices(),
        {
          get controlToggleVm () { return vm },
        },
      )
    },
  },
}
