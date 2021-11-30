import { mergeDescriptors } from '../utils'
import stubVNode from './stub-vnode'
import olCmp, { makeChangeOrRecreateWatchers } from './ol-cmp'

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
    duration: Number,
    reverse: Boolean,
    repeat: Number,
    fade: Function,
    easing: Function,
  },
  created () {
    this::defineServices()
  },
  watch: {
    .../*#__PURE__*/makeChangeOrRecreateWatchers([
      'duration',
      'reverse',
      'repeat',
      'fade',
      'easing',
    ]),
  },
  methods: {
    /**
     * Create FeatureAnimation
     * @return {module:ol-ext/featureAnimation/FeatureAnimation~FeatureAnimation}
     * @protected
     * @abstract
     */
    createFeatureAnimation () {
      throw new Error(`${this.vmName} not implemented method: createFeatureAnimation()`)
    },
    createOlObject () {
      const newFeatureAnimation = this.createFeatureAnimation()
      newFeatureAnimation.on('animationstart', event => {
        this.$emit('animationstart', event)
      })
      newFeatureAnimation.on('animating', event => {
        this.$emit('animating', event)
      })
      newFeatureAnimation.on('animationend', event => {
        this.$emit('animationend', event)
      })
      return newFeatureAnimation
    },
    /**
     * @return {Promise<FeatureAnimation>}
     */
    resolveAnimation: olCmp.methods.resolveOlObject,
    /**
     * @return {Promise<void>}
     * @protected
     */
    async mount () {
      this.$featureVm?.animate(this)

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
    getServices () {
      const vm = this
      return mergeDescriptors(
        this::olCmp.methods.getServices(),
        {
          get animationVm () { return vm },
        },
      )
    },
  },
}

function defineServices () {
  Object.defineProperties(this, {
    $animation: {
      enumerable: true,
      get: () => this.$olObject,
    },
  })
}
