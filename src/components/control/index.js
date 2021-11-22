import OverlayMenu from './overlay-menu.vue'

function plugin (Vue, options = {}) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.component(OverlayMenu.name, OverlayMenu)
}

export default plugin

export {
  plugin as install,
  OverlayMenu,
}
