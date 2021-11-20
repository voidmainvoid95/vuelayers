import { mergeDescriptors } from '../utils'
import olCmp from './ol-cmp'

export default {
  mixins: [
    olCmp,
  ],
  props: {
    duration: {
      type: Number,
    },
    reverse: {
      type: Boolean,
    },
    repeat: {
      type: Number,
    },
    fade: {
      type: Function,
    },
    easing: {
      type: Function,
    },
  },
  data () {
    return {
      currentDuration: 1000,
      currentReverse: false,
      currentRepeat: 0,
      currentEasing: undefined,
      currentFade: undefined,
    }
  },
  created () {
    this::defineServices()
    this.currentDuration = this.duration || this.currentDuration
    this.currentReverse = this.reverse || this.currentReverse
    this.currentRepeat = this.repeat || this.currentRepeat
    this.currentEasing = this.easing || this.currentEasing
    this.currentFade = this.fade || this.currentFade
  },
  methods: {
    /**
     * Create featureAnimation
     * @return {module:ol-ext/featureanimation/FeatureAnimation~FeatureAnimation}
     * @protected
     */
    async createOlObject () {
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
    $featureVm: {
      enumerable: true,
      get: () => this.$services?.featureVm,
    },
  })
}
