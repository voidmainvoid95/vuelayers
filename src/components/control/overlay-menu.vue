<template>
  <div
    :id="vmId"
    :class="vmClass"
    style="display: none !important;">
    <ControlToggle
      ref="toggle"
      :class-name="toggleClasses"
      @toggle="$control.toggle()">
      <FontAwesomeIcon icon="bars" />
    </ControlToggle>
    <div
      ref="content"
      class="content">
      <div style="margin-bottom: 0.5em">
        <slot
          name="top"
          :control="$control">
          <i @click="$control.toggle()">
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
  import { control, makeChangeOrRecreateWatchers } from '../../mixins'
  import { mergeDescriptors, identity } from '../../utils'
  import ControlToggle from './toggle.vue'

  export default {
    name: 'VlOverlayMenu',
    components: {
      ControlToggle,
    },
    mixins: [
      control,
    ],
    props: {
      right: {
        type: Boolean,
        default: false,
      },
      hideOnClick: {
        type: Boolean,
        default: false,
      },
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
      toggleClasses () {
        return [this.vmClass, this.right ? 'right' : 'left'].join(' ')
      },
    },
    watch: {
      .../*#__PURE__*/makeChangeOrRecreateWatchers([
        'right',
        'hideOnClick',
      ]),
    },
    methods: {
      /**
       * Create Overlay
       * @return {module:ol-ext/control/Overlay~Overlay}
       * @protected
       */
      createControl () {
        return new Overlay({
          closeBox: false,
          className: this.classes.join(' '),
          content: this.$refs.content,
          hideOnClick: this.hideOnClick,
        })
      },
      /**
       * @return {Promise<Overlay>}
       */
      resolveOverlayMenu: control.methods.resolveControl,
      /**
       * @return {Promise<void>}
       * @protected
       */
      async mount () {
        this.updateDefaultControls()
        return this::control.methods.mount()
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
            get overlayMenuVm () { return vm },
          },
        )
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
  .vl-overlay-menu.ol-control.ol-toggle.left
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
  .vl-overlay-menu.ol-control.ol-toggle button
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
