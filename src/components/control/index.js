import Toggle from './toggle.vue'
import OverlayMenu from './overlay-menu.vue'
import GeolocationButton from './geolocation-button.vue'
import SearchNominatim from './search-bar-nominatim.vue'
import SearchPhoton from './search-bar-photon.vue'

function plugin (Vue, options = {}) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.component(Toggle.name, Toggle)
  Vue.component(OverlayMenu.name, OverlayMenu)
  Vue.component(GeolocationButton.name, GeolocationButton)
  Vue.component(SearchNominatim.name, SearchNominatim)
  Vue.component(SearchPhoton.name, SearchPhoton)
}

export default plugin

export {
  plugin as install,
  Toggle,
  OverlayMenu,
  GeolocationButton,
  SearchNominatim,
  SearchPhoton,
}
