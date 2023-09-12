import {
  BingmapsSource,
  ClusterSource,
  DrawInteraction,
  Feature,
  FeatureAnimation,
  Geoloc,
  GraticuleLayer,
  GroupLayer,
  HeatmapLayer,
  ImageArcgisRestSource,
  ImageLayer,
  ImageStaticSource,
  ImageWmsSource,
  Map,
  MapboxSource,
  MapboxVectorLayer,
  ModifyInteraction,
  OsmSource,
  Overlay,
  Control,
  RotateInteraction,
  SelectInteraction,
  SnapInteraction,
  SputnikSource,
  StamenSource,
  Style,
  StyleFunc,
  TileArcgisRestSource,
  TileLayer,
  TileWmsSource,
  TranslateInteraction,
  VectorImageLayer,
  VectorLayer,
  VectorSource,
  VectorTileLayer,
  VectorTileSource,
  WmtsSource,
  XyzSource,
} from './components'
import './styles/main.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faLocationArrow, faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add([faBars, faLocationArrow, faSearch, faChevronDown])

/**
 * @const {string} VueLayers version.
 */
export const VERSION = 'C_PKG_VERSION'

/**
 * @typedef {Object} VueLayersOptions
 * @property {string} [dataProjection] Projection for all properties, events and other plain values.
 */
/**
 * Registers all VueLayers components.
 * @param {Vue|VueConstructor} Vue
 * @param {VueLayersOptions} [options]
 */
export default function plugin (Vue, options = {}) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.component('FontAwesomeIcon', FontAwesomeIcon)

  // install components
  Vue.use(BingmapsSource, options)
  Vue.use(ClusterSource, options)
  Vue.use(Control, options)
  Vue.use(DrawInteraction, options)
  Vue.use(Feature, options)
  Vue.use(FeatureAnimation, options)
  Vue.use(Geoloc, options)
  Vue.use(GraticuleLayer, options)
  Vue.use(GroupLayer, options)
  Vue.use(HeatmapLayer, options)
  Vue.use(ImageArcgisRestSource, options)
  Vue.use(ImageLayer, options)
  Vue.use(ImageStaticSource, options)
  Vue.use(ImageWmsSource, options)
  Vue.use(Map, options)
  Vue.use(MapboxSource, options)
  Vue.use(MapboxVectorLayer, options)
  Vue.use(ModifyInteraction, options)
  Vue.use(OsmSource, options)
  Vue.use(Overlay, options)
  Vue.use(RotateInteraction, options)
  Vue.use(SelectInteraction, options)
  Vue.use(SnapInteraction, options)
  Vue.use(SputnikSource, options)
  Vue.use(StamenSource, options)
  Vue.use(Style, options)
  Vue.use(StyleFunc, options)
  Vue.use(TileArcgisRestSource, options)
  Vue.use(TileLayer, options)
  Vue.use(TileWmsSource, options)
  Vue.use(TranslateInteraction, options)
  Vue.use(VectorImageLayer, options)
  Vue.use(VectorLayer, options)
  Vue.use(VectorSource, options)
  Vue.use(VectorTileLayer, options)
  Vue.use(VectorTileSource, options)
  Vue.use(WmtsSource, options)
  Vue.use(XyzSource, options)
}

export {
  plugin as install,
  // components
  BingmapsSource,
  ClusterSource,
  Control,
  DrawInteraction,
  Feature,
  FeatureAnimation,
  Geoloc,
  GraticuleLayer,
  GroupLayer,
  HeatmapLayer,
  ImageArcgisRestSource,
  ImageLayer,
  ImageStaticSource,
  ImageWmsSource,
  Map,
  MapboxSource,
  MapboxVectorLayer,
  ModifyInteraction,
  OsmSource,
  Overlay,
  RotateInteraction,
  SelectInteraction,
  SnapInteraction,
  SputnikSource,
  StamenSource,
  Style,
  StyleFunc,
  TileArcgisRestSource,
  TileLayer,
  TileWmsSource,
  TranslateInteraction,
  VectorImageLayer,
  VectorLayer,
  VectorSource,
  VectorTileLayer,
  VectorTileSource,
  WmtsSource,
  XyzSource,
}
