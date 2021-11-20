import Bounce from './bounce.vue'
import Blink from './blink.vue'
import Drop from './drop.vue'
import Fade from './fade.vue'
import Path from './path.vue'
import Shake from './shake.vue'
import Show from './show.vue'
import Slide from './slide.vue'
import Teleport from './teleport.vue'
import Throw from './throw.vue'
import Zoom from './zoom.vue'
import None from './none.vue'
import Pulse from './pulse.vue'

function plugin (Vue, options = {}) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.component(Bounce.name, Bounce)
  Vue.component(Blink.name, Blink)
  Vue.component(Drop.name, Drop)
  Vue.component(Fade.name, Fade)
  Vue.component(Path.name, Path)
  Vue.component(Shake.name, Shake)
  Vue.component(Show.name, Show)
  Vue.component(Slide.name, Slide)
  Vue.component(Teleport.name, Teleport)
  Vue.component(Throw.name, Throw)
  Vue.component(Zoom.name, Zoom)
  Vue.component(None.name, None)
  Vue.component(Pulse.name, Pulse)
}

export default plugin

export {
  plugin as install,
  Bounce,
  Blink,
  Drop,
  Fade,
  Path,
  Shake,
  Show,
  Slide,
  Teleport,
  Throw,
  Zoom,
  None,
  Pulse,
}
