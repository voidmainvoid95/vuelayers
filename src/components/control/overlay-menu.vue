<template>
  <div
    :id="vmId"
    :class="vmClass"
    style="display: none !important;">
    <button ref="toggle">
      <slot name="toggle">
        <FontAwesomeIcon icon="bars" />
      </slot>
    </button>
    <div
      ref="content"
      class="content">
      <div style="margin-bottom: 0.5em">
        <slot
          name="top"
          :overlayMenu="$overlayMenu">
          <i @click="$overlayMenu.toggle()">
            <FontAwesomeIcon icon="bars" />
          </i>
        </slot>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
  import Overlay from 'ol-ext/control/Overlay'
  import Toggle from 'ol-ext/control/Toggle'
  import { Zoom } from 'ol/control'
  import olCmp from '../../mixins/ol-cmp'
  import { mergeDescriptors } from '../../utils'
  import stubVNode from '../../mixins/stub-vnode'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faBars } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  library.add(faBars)

  export default {
    name: 'VlOverlayMenu',
    components: {
      FontAwesomeIcon,
    },
    mixins: [
      stubVNode,
      olCmp,
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
    data () {
      return {
        currentCloseBox: false,
        currentClassName: 'slide-left menu',
        currentHideOnClick: false,
      }
    },
    created () {
      this::defineServices()
    },
    methods: {
      printMenu () {
        this.$overlayMenu.toggle()
      },
      /**
       * Create OverlayMenu
       * @return {module:ol-ext/control/Overlay~Overlay}
       * @protected
       */
      createOlObject () {
        const newControlOverlay = new Overlay({
          closeBox: this.currentCloseBox,
          className: this.currentClassName,
          content: this.$refs.content,
          hideOnClick: this.currentHideOnClick,
        })
        this.$toggle = new Toggle({
          html: this.$refs.toggle,
          className: `${this.vmClass} toggle`,
          title: 'Menu',
          onToggle: () => { this.$overlayMenu.toggle() },
        })
        return newControlOverlay
      },
      resolveOverlayMenu: olCmp.methods.resolveOlObject,
      async mount () {
        const currentControls = this.$controlsContainer.getControls()
        currentControls.forEach(control => {
          if (control instanceof Zoom) {
            control.element.className += ` ${this.vmClass}`
          }
        })
        this.$controlsContainer?.addControls([this.$overlayMenu, this.$toggle])
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
            get overlayMenuVm () { return vm },
          },
        )
      },
    },
  }

  function defineServices () {
    Object.defineProperties(this, {
      $overlayMenu: {
        enumerable: true,
        get: () => this.$olObject,
      },
      $overlayMenuToggle: {
        enumerable: true,
        get: () => this.$toggle,
      },
      $controlsContainer: {
        enumerable: true,
        get: () => this.$services?.controlsContainer,
      },
    })
  }
</script>
<style>
  .ol-overlay.menu
  {
    width: 30%;
    background: #fff;
    color: #333;
    box-shadow: 0px 0px 5px #000;
    padding: 0.5em;
    -webkit-transition: all 0.25s;
    transition: all 0.25s;
  }
  .vl-overlay-menu.toggle
  {
    top: 0.5em;
    left: 0.5em;
  }
  .vl-overlay-menu.toggle button
  {
    color: #fff;
  }
  .vl-overlay-menu.ol-zoom {
    top: 3em!important;
  }
</style>

<style scoped>
  .content
  {
    font-size: 0.9em;
  }
</style>
