import { mergeDescriptors } from '../utils'
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
    .../*#__PURE__*/makeChangeOrRecreateWatchers([
      'title',
      'active',
      'disable',
      'autoActive',
    ]),
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
