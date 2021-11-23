import OverlayMenu from './overlay-menu.vue'
import GeolocationButton from './geolocation-button'

function plugin (Vue, options = {}) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.component(OverlayMenu.name, OverlayMenu)
  Vue.component(GeolocationButton.name, GeolocationButton)
}

export default plugin

export {
  plugin as install,
  OverlayMenu,
  GeolocationButton,
}
