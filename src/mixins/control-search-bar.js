import { mergeDescriptors } from '../utils'
import control from './control'
import GeoJSON from 'ol/format/GeoJSON'
import getCenter from 'ol/extent'
import {
  getMapDataProjection,
} from '../ol-ext'
import { makeChangeOrRecreateWatchers } from './ol-cmp'

export default {
  mixins: [
    control,
  ],
  props: {
    disableDefaultSelectHandler: {
      type: Boolean,
      default: false,
    },
    title: String,
    reverseTitle: String,
    placeholder: String,
    inputLabel: String,
    collapsed: String,
    noCollapse: String,
    typing: Number,
    minLength: Number,
    maxItems: Number,
    centerOnSelect: Boolean,
    zoomOnSelect: Boolean,
  },
  watch: {
    .../*#__PURE__*/makeChangeOrRecreateWatchers([
      'title',
      'reverseTitle',
      'placeholder',
      'inputLabel',
      'collapsed',
      'noCollapse',
      'typing',
      'minLength',
      'maxItems',
      'centerOnSelect',
      'zoomOnSelect',
    ]),
  },
  methods: {
    /**
     * Create SearchBar
     * @return {module:ol-ext/control/SearchBar~SearchBar}
     * @protected
     */
    createSearchBar () {
      throw new Error(`${this.vmName} not implemented method: createSearchBar()`)
    },
    createControl () {
      const newSearchBar = this.createSearchBar()
      newSearchBar.on('select', event => {
        if (this.disableDefaultSelectHandler) { this.$emit('select', event) } else { this.defaultSelectHandler(event) }
      })
      return newSearchBar
    },
    /**
     * @return {Promise<SearchBar>}
     */
    resolveSearchBar: control.methods.resolveControl,
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
