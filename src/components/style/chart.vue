<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;">
    <slot>
      <StrokeStyle
        color="#fff"
        :width="2" />
      <TextStyle
        v-for="(label,idx) in labels"
        :key="idx"
        :text="label.text"
        :offset-x="label.offsetX"
        :offset-y="label.offsetY"
        :text-align="label.textAlign"
        :text-baseline="label.textBaseline">
        <StrokeStyle
          :color="label.strokeColor"
          :width="label.strokeWidth" />
        <FillStyle :color="label.fillColor" />
      </TextStyle>
    </slot>
  </i>
</template>

<script>
  import { Stroke, Style, Text } from 'ol/style'
  import { style, strokeStyleContainer, textStyleContainer } from '../../mixins'
  import Chart from 'ol-ext/style/Chart'
  import { assert, mergeDescriptors } from '../../utils'
  import StrokeStyle from './stroke.vue'
  import TextStyle from './text.vue'
  import FillStyle from './fill.vue'

  export default {
    name: 'VlStyleChart',
    components: {
      StrokeStyle,
      TextStyle,
      FillStyle,
    },
    mixins: [
      style,
      strokeStyleContainer,
      textStyleContainer,
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
      data: {
        type: Array,
        default: () => {
          return []
        },
      },
      type: {
        type: String,
        default: 'pie',
      },
      radius: {
        type: Number,
        default: 50,
      },
      rotateWithView: {
        type: Boolean,
        default: true,
      },
    },
    data () {
      return {
        currentStroke: undefined,
      }
    },
    computed: {
      labels () {
        const labels = []
        let s = 0
        for (let i = 0; i < this.data.length; i++) {
          const d = this.data[i]
          const a = (2 * s + d) * Math.PI - Math.PI / 2
          const v = Math.round(d * 100)
          if (v > 0) {
            labels.push({
              text: `${v} %`,
              offsetX: Math.cos(a) * (this.radius + 3),
              offsetY: Math.sin(a) * (this.radius + 3),
              textAlign: a < Math.PI / 2 ? 'left' : 'right',
              textBaseline: 'middle',
              strokeColor: '#fff',
              strokeWidth: 1.5,
              fillColor: '#333',
            })
          }
          s += d
        }
        return labels
      },
    },
    created () {
      this::defineServices()
    },
    methods: {
      async createStyle () {
        return new Chart({
          type: this.type,
          radius: this.radius,
          data: this.data,
          rotateWithView: this.rotateWithView,
          stroke: this.currentStroke,
        })
      },
      async mount () {
        this.$imageStyleContainer?.setImage(this)

        return this::style.methods.mount()
      },
      async unmount () {
        return this::style.methods.unmount()
      },
      getStrokeStyleTarget () {
        return this.$style
      },
      /**
       * @param {module:ol/style/Stroke~Stroke|undefined} stroke
       */
      setStroke (stroke) {
        stroke = stroke?.$style || stroke
        stroke || (stroke = undefined)
        assert(!stroke || stroke instanceof Stroke, 'Invalid stroke')

        this.currentStroke = stroke
        this.scheduleRecreate()
      },
      /**
       * @param {module:ol/style/Text~Text|undefined} text
       */
      setText (text) {
        text = text?.$style || text
        text || (text = undefined)
        assert(!text || text instanceof Text, 'Invalid text style')

        const label = new Style({
          text,
        })

        this.$styleContainer?.addStyle(label)
        this.scheduleRefresh()
      },
      /**
       * @returns {Object}
       * @protected
       */
      getServices () {
        const vm = this

        return mergeDescriptors(
          this::style.methods.getServices(),
          this::strokeStyleContainer.methods.getServices(),
          this::textStyleContainer.methods.getServices(),
          {
            get chartStyleVm () { return vm },
          },
        )
      },
    },
  }

  function defineServices () {
    Object.defineProperties(this, {
      $imageStyleContainer: {
        enumerable: true,
        get: () => this.$services?.strokeStyleContainer,
      },
    })
  }
</script>

<style scoped>

</style>
