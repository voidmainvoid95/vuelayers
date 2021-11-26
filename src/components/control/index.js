import Toggle from './toggle.vue'
import OverlayMenu from './overlay-menu.vue'
import GeolocationButton from './geolocation-button.vue'
import SearchNominatim from './search-bar-nominatim.vue'
import SearchPhoton from './search-bar-photon.vue'
import Zoom from './zoom.vue'
import ZoomSlider from './zoom-slider.vue'
import Rotate from './rotate.vue'
import FullScreen from './full-screen.vue'
import Bar from './control-bar'
import Attribution from './attribution.vue'
import ControlDefault from './control-default.vue'

function plugin (Vue, options = {}) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.component(Zoom.name, Zoom)
  Vue.component(ZoomSlider.name, ZoomSlider)
  Vue.component(Rotate.name, Rotate)
  Vue.component(FullScreen.name, FullScreen)
  Vue.component(Bar.name, Bar)
  Vue.component(Toggle.name, Toggle)
  Vue.component(OverlayMenu.name, OverlayMenu)
  Vue.component(GeolocationButton.name, GeolocationButton)
  Vue.component(SearchNominatim.name, SearchNominatim)
  Vue.component(SearchPhoton.name, SearchPhoton)
  Vue.component(Attribution.name, Attribution)
  Vue.component(ControlDefault.name, ControlDefault)
}

export default plugin

export {
  plugin as install,
  Zoom,
  ZoomSlider,
  Rotate,
  Toggle,
  Bar,
  OverlayMenu,
  GeolocationButton,
  SearchNominatim,
  SearchPhoton,
  Attribution,
  ControlDefault,
}
