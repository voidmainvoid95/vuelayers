<template>
  <div id="app">
    <VlMap
      ref="map"
      :default-interactions="interactionOptions"
      data-projection="EPSG:4326">
      <VlSearchBarNominatim />
      <VlControlBar>
        <VlFullScreen v-if="fullscreenButton" />
        <VlControlToggle
          v-if="geolocationButton">
          <font-awesome-icon icon="chevron-down" />
          <VlControlBar>
            <VlGeolocationButton />
          </VlControlBar>
        </VlControlToggle>
      </VlControlBar>
      <VlOverlayMenu
        ref="overlayMenu"
        :right="menuRight">
        <div>
          Choose an animation:
          <select
            v-model="pickedAnimation"
            name="animation">
            <template v-for="(animation, idx) in animations">
              <option
                :key="idx"
                :value="animation">
                {{ animation }}
              </option>
            </template>
          </select>
        </div>
        <div>
          Geolocation button:
          <label class="switch">
            <input
              v-model="geolocationButton"
              type="checkbox">
          </label>
        </div>
        <div>
          FullScreen button:
          <label class="switch">
            <input
              v-model="fullscreenButton"
              type="checkbox">
          </label>
        </div>
        <div>
          Overlay Menu Position:
          <div>
            <input
              v-model="overlayMenuPosition"
              type="radio"
              name="menuPosition"
              value="left">
            Left
          </div>
          <div>
            <input
              v-model="overlayMenuPosition"
              type="radio"
              name="menuPosition"
              value="right">
            Right
          </div>
        </div>
        <div v-if="currentPosition">
          Current position:
          {{ currentPosition }}
        </div>
      </VlOverlayMenu>
      <VlView
        :zoom.sync="zoom"
        :center.sync="center" />
      <VlLayerTile>
        <VlSourceOsm @created="sourceCreated" />
      </VlLayerTile>

      <VlLayerVector class-name="pippo">
        <VlFeature>
          <VlFeatureAnimationBounce v-if="pickedAnimation === 'bounce'" />
          <VlFeatureAnimationDrop v-else-if="pickedAnimation === 'drop'" />
          <VlFeatureAnimationFade v-else-if="pickedAnimation === 'fade'" />
          <VlFeatureAnimationPath v-else-if="pickedAnimation === 'path'" />
          <VlFeatureAnimationPulse v-else-if="pickedAnimation === 'pulse'" />
          <VlFeatureAnimationShake v-else-if="pickedAnimation === 'shake'" />
          <VlFeatureAnimationShow v-else-if="pickedAnimation === 'show'" />
          <VlFeatureAnimationSlide v-else-if="pickedAnimation === 'slide'" />
          <VlFeatureAnimationTeleport v-else-if="pickedAnimation === 'teleport'" />
          <VlFeatureAnimationThrow v-else-if="pickedAnimation === 'throw'" />
          <VlFeatureAnimationZoom v-else-if="pickedAnimation === 'zoom'" />
          <VlGeomPoint :coordinates="position" />
          <VlStyle>
            <VlStyleChart
              :data="[0.2, 0.3, 0.4, 0.1]"
              type="pie" />
          </VlStyle>
        </VlFeature>
      </VlLayerVector>
      <!---
      <VlLayerVector>
        <VlSourceVector :features="savedFeatures" />
      </VlLayerVector>

      <VlInteractionSelect :features.sync="selectedFeatures" />
      --->
    </VlMap>
  </div>
</template>

<script>
  import { random, range } from 'lodash'
  // import { OverviewMap } from 'ol/control'
  // import { Tile as TileLayer } from 'ol/layer'

  export default {
    name: 'App',
    data: function () {
      return {
        zoom: 14,
        center: [15.07733892913811, 37.52482234534241],
        position: [15.07733892913811, 37.52482234534241],
        animations: ['none', 'bounce', 'drop', 'fade', 'path', 'pulse', 'shake', 'show', 'slide', 'teleport', 'throw', 'zoom'],
        pickedAnimation: 'none',
        geolocationButton: true,
        fullscreenButton: true,
        currentPosition: null,
        overlayMenuPosition: 'left',
        extent: null,
        features: [],
        selectedFeatures: [],
        savedFeatures: range(0, 100).map(i => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              random(-50, 50),
              random(-50, 50),
            ],
          },
        })),
        url: 'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
        interactionOptions: {
          dragPan: true,
          onFocusOnly: true,
          shiftDragZoom: true,
          mouseWheelZoom: true,
          pinchZoom: true,
        },
        mapLock: false,
      }
    },
    computed: {
      menuRight () {
        return this.overlayMenuPosition === 'right'
      },
    },
    watch: {
      mapLock () {
        this.lockToggle()
      },
      overlayMenuPosition () {
        console.log('overlayMenuPosition', this.overlayMenuPosition === 'right')
      },
    },
    methods: {
      sourceCreated (vm) {
        // this.$refs.map.addControl(new OverviewMap({
        //   collapsed: false,
        //   layers: [new TileLayer({ source: vm.$source })],
        // }))
      },
      lockToggle () {
        this.interactionOptions.dragPan = !this.interactionOptions.dragPan
        this.interactionOptions.onFocusOnly = !this.interactionOptions.onFocusOnly
        this.interactionOptions.shiftDragZoom = !this.interactionOptions.shiftDragZoom
        this.interactionOptions.mouseWheelZoom = !this.interactionOptions.mouseWheelZoom
        this.interactionOptions.pinchZoom = !this.interactionOptions.pinchZoom
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~ol/ol";

  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    box-sizing: border-box;
    font-family: Helvetica, Arial, sans-serif;
    overflow: hidden;

    * {
      box-sizing: border-box;
    }
  }
</style>
