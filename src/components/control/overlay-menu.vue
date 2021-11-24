<template>
  <div
    :id="vmId"
    :class="vmClass"
    style="display: none !important;">
    <div ref="toggle">
      <VlControlToggle
        :class-name="vmClass"
        @toggle="toggleOverlayMenu">
        <FontAwesomeIcon icon="bars" />
      </VlControlToggle>
    </div>
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
  import { Zoom } from 'ol/control'
  import olCmp from '../../mixins/ol-cmp'
  import { mergeDescriptors, identity } from '../../utils'
  import stubVNode from '../../mixins/stub-vnode'
  import VlControlToggle from './toggle'

  export default {
    name: 'VlOverlayMenu',
    components: {
      VlControlToggle,
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
    props: {
      right: {
        type: Boolean,
        default: false,
      },
      className: String,
    },
    data () {
      return {
        currentCloseBox: false,
        currentClassName: '',
        currentHideOnClick: false,
      }
    },
    computed: {
      classes () {
        const classes = [this.className, this.vmClass, 'menu'].filter(identity)
        if (this.right) {
          classes.push('slide-right')
          classes.push('right')
        } else {
          classes.push('slide-left')
          classes.push('left')
        }
        return classes
      },
    },
    watch: {
      right () {
        this.updateDefaultControls()
        if (this.right) {
          this.$overlayMenu.element.className = this.$overlayMenu.element.className.replace('left', 'right')
        } else {
          this.$overlayMenu.element.className = this.$overlayMenu.element.className.replace('right', 'left')
        }
      },
    },
    created () {
      this::defineServices()
    },
    methods: {
      /**
       * Create OverlayMenu
       * @return {module:ol-ext/control/Overlay~Overlay}
       * @protected
       */
      createOlObject () {
        return new Overlay({
          closeBox: this.currentCloseBox,
          className: this.classes.join(' '),
          content: this.$refs.content,
          hideOnClick: this.currentHideOnClick,
        })
      },
      resolveOverlayMenu: olCmp.methods.resolveOlObject,
      async mount () {
        this.updateDefaultControls()
        this.$controlsContainer?.addControl(this.$overlayMenu)
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
      toggleOverlayMenu () {
        this.$overlayMenu.toggle()
      },
      updateDefaultControls () {
        const currentControls = this.$controlsContainer.getControls()
        currentControls.forEach(control => {
          if (control instanceof Zoom) {
            if (control.element.className.includes(this.vmClass)) {
              if (this.right) {
                control.element.className = control.element.className.replace('left', '')
              } else { control.element.className = control.element.className += 'left' }
            } else { control.element.className += ` ${this.vmClass} ${this.right ? '' : 'left'}` }
          }
        })
      },
    },
  }

  function defineServices () {
    Object.defineProperties(this, {
      $overlayMenu: {
        enumerable: true,
        get: () => this.$olObject,
      },
      $controlsContainer: {
        enumerable: true,
        get: () => this.$services?.controlsContainer,
      },
    })
  }
</script>
<style>
  .vl-overlay-menu.ol-overlay.slide-right
  {
    left: auto!important;
    right: 0;
  }
  .vl-overlay-menu.ol-overlay.menu
  {
    width: 30%;
    background: #fff;
    color: #333;
    box-shadow: 0px 0px 5px #000;
    padding: 0.5em;
    -webkit-transition: all 0.25s;
    transition: all 0.25s;
  }
  .vl-overlay-menu.ol-overlay.ol-visible.right
  {
    left: auto!important;
  }
  .vl-overlay-menu.ol-control.ol-toggle
  {
    top: 0.5em;
    left: 0.5em;
  }
  .vl-overlay-menu.ol-control.ol-toggle.right
  {
    top: 0.5em;
    left: auto;
    right: 0.5em;
  }
  .vl-overlay-menu.toggle button
  {
    color: #fff;
  }
  .vl-overlay-menu.ol-zoom.left {
    top: 3em!important;
  }
</style>

<style scoped>
  .content
  {
    font-size: 0.9em;
  }
</style>
