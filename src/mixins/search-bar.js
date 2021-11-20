import { mergeDescriptors } from '../utils'
import olCmp from './ol-cmp'
import GeoJSON from 'ol/format/GeoJSON'
import getCenter from 'ol/extent'
import {
  getMapDataProjection,
} from '../ol-ext'

export default {
  mixins: [
    olCmp,
  ],
  props: {
    disableDefaultSelectHandler: {
      type: Boolean,
      default: false,
    },
    target: {
      type: String || HTMLElement,
    },
    title: {
      type: String,
    },
    reverseTitle: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    inputLabel: {
      type: String,
    },
    collapsed: {
      type: Boolean,
    },
    noCollapse: {
      type: Boolean,
    },
    typing: {
      type: Number,
    },
    minLength: {
      type: Number,
    },
    maxItems: {
      type: Number,
    },
    centerOnSelect: {
      type: Boolean,
    },
    zoomOnSelect: {
      type: Boolean,
    },
  },
  data () {
    return {
      currentTarget: '',
      currentTitle: '',
      currentReverseTitle: '',
      currentPlaceholder: '',
      currentInputLabel: '',
      currentCollapsed: true,
      currentNoCollapse: false,
      currentTyping: undefined,
      currentMinLength: undefined,
      currentMaxItems: undefined,
      currentCenterOnSelect: false,
      currentZoomOnSelect: false,
    }
  },
  created () {
    this::defineServices()
    this.currentTarget = this.target || this.currentTarget
    this.currentTitle = this.title || this.currentTitle
    this.currentReverseTitle = this.reverseTitle || this.currentReverseTitle
    this.currentPlaceholder = this.placeholder || this.currentPlaceholder
    this.currentInputLabel = this.inputLabel || this.currentInputLabel
    this.currentCollapsed = this.collapsed || this.currentCollapsed
    this.currentNoCollapse = this.noCollapse || this.currentNoCollapse
    this.currentTyping = this.typing || this.currentTyping
    this.currentMinLength = this.minLength || this.currentMinLength
    this.currentMaxItems = this.maxItems || this.currentMaxItems
    this.currentCenterOnSelect = this.centerOnSelect || this.currentCenterOnSelect
    this.currentZoomOnSelect = this.zoomOnSelect || this.currentZoomOnSelect
  },
  methods: {
    /**
     * Create SearchBar
     * @return {module:ol-ext/control/SearchBar~SearchBar}
     * @protected
     */
    async createOlObject () {
      const newSearchBar = this.createSearchBar()
      newSearchBar.on('select', event => {
        if (this.disableDefaultSelectHandler) { this.$emit('select', event) } else { this.defaultSelectHandler(event) }
      })
      return newSearchBar
    },
    /**
     * @return {Promise<SearchBar>}
     */
    resolveSearchBar: olCmp.methods.resolveOlObject,
    /**
     * @return {Promise<void>}
     * @protected
     */
    async mount () {
      this.$controlsContainer?.addControl(this.$searchBar)

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
          get searchBarVm () { return vm },
        },
      )
    },
    defaultSelectHandler (event) {
      const map = this.$controlsContainer?.$map
      const view = map.getView()
      if (event.search.geojson) {
        const format = new GeoJSON()
        const f = format.readFeature(event.search.geojson, {
          dataProjection: getMapDataProjection(map),
          featureProjection: view.getProjection(),
        })
        const resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), map.getSize())
        const zoom = view.getZoomForResolution(resolution)
        const center = getCenter(f.getGeometry().getExtent())
        setTimeout(function () {
          view.animate({
            center: center,
            zoom: Math.min(zoom, 16),
          })
        }, 100)
      } else {
        view.animate({
          center: event.coordinate,
          zoom: Math.max(view.getZoom(), 16),
        })
      }
    },
  },
}

function defineServices () {
  Object.defineProperties(this, {
    $searchBar: {
      enumerable: true,
      get: () => this.$olObject,
    },
    $controlsContainer: {
      enumerable: true,
      get: () => this.$services?.controlsContainer,
    },
  })
}
