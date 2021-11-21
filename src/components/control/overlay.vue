<template>
  <div
    :id="vmId"
    :class="vmClass"
    style="display: none !important;">
    <slot name="toggle">
      <VlToggle @toggle="printMenu" />
    </slot>
    <div
      ref="content"
      class="content">
      <slot />
    </div>
  </div>
</template>

<script>
  import Overlay from 'ol-ext/control/Overlay'
  import controlOverlay from '../../mixins/control-overlay'
  import VlToggle from './toggle'

  export default {
    name: 'VlOverlayMenu',
    components: { VlToggle },
    mixins: [
      controlOverlay,
    ],
    methods: {
      printMenu () {
        this.$overlayMenu.toggle()
      },
      createControlOverlay () {
        return new Overlay({
          closeBox: this.currentCloseBox,
          className: this.currentClassName,
          content: this.$refs.content,
          hideOnClick: this.currentHideOnClick,
        })
      },
    },
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
  /* style the close box */
  .ol-overlay.menu .ol-closebox
  {
    color: #369;
    left: 1em;
    top: 0.5em;
  }
  .ol-overlay.menu .ol-closebox:before
  {
    content:"\f0c9";
    font-family: FontAwesome;
  }
  .content
  {
    padding-top: 1.5em;
    font-size: 0.9em;
  }
  /* menu button */
  .ol-control.menu
  {
    top: 0.5em;
    left: 0.5em;
  }
  .ol-control.menu i
  {
    color: #fff;
  }
  .ol-zoom
  {
    left: auto;
    right: 0.5em;
  }
  .ol-rotate
  {
    right: 3em;
  }
  .ol-touch .ol-rotate
  {
    right: 3.5em;
  }
  /**/
  .ol-overlay img
  {
    max-width: 90%;
  }
  .data,
  .data p
  {
    margin:0;
    text-align: center;
    font-size:0.9em;
  }
</style>
