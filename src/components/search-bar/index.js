import SearchBarNominatim from './search-bar-nominatim.vue'
import SearchBarPhoton from './search-bar-photon.vue'

function plugin (Vue, options = {}) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.component(SearchBarNominatim.name, SearchBarNominatim)
  Vue.component(SearchBarPhoton.name, SearchBarPhoton)
}

export default plugin

export {
  plugin as install,
  SearchBarNominatim,
  SearchBarPhoton,
}
