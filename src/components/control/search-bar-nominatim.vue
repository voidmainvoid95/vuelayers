<template>
  <i
    :id="vmId"
    ref="icon"
    :class="vmClass">
    <slot name="icon">
      <font-awesome-icon icon="search" />
    </slot>
  </i>
</template>

<script>
  import SearchNominatim from 'ol-ext/control/SearchNominatim'
  import { controlSearchBar } from '../../mixins'

  export default {
    name: 'VlSearchBarNominatim',
    mixins: [
      controlSearchBar,
    ],
    props: {
      url: {
        type: String,
      },
      polygon: {
        type: Boolean,
      },
      bounded: {
        type: Boolean,
      },
      viewbox: {
        type: Number,
      },
    },
    data () {
      return {
        currentUrl: 'https://nominatim.openstreetmap.org/search',
        currentPolygon: false,
        currentViewbox: 0,
        currentBounded: undefined,
      }
    },
    created () {
      this.currentUrl = this.url || this.currentUrl
      this.currentPolygon = this.polygon || this.currentPolygon
      this.currentBounded = this.bounded || this.currentBounded
      this.currentViewbox = this.viewbox || this.currentViewbox
    },
    methods: {
      createSearchBar () {
        const newSearchBar = new SearchNominatim({
          className: this.vmClass,
          polygon: this.currentPolygon,
          viewbox: this.currentViewbox,
          bounded: this.currentBounded,
          url: this.currentUrl,
          title: this.currentTitle,
          reverseTitle: this.currentReverseTitle,
          placeholder: this.currentPlaceholder,
          inputLabel: this.currentInputLabel,
          collapsed: this.currentCollapsed,
          noCollapse: this.currentNoCollapse,
          typing: this.currentTyping,
          minLength: this.currentMinLength,
          maxItems: this.currentMaxItems,
          centerOnSelect: this.currentCenterOnSelect,
          zoomOnSelect: this.currentZoomOnSelect,
        })
        newSearchBar.element.childNodes.forEach(item => {
          if (item.nodeName === 'BUTTON') { item.appendChild(this.$refs.icon) }
        })
        return newSearchBar
      },
    },
  }
</script>

<style>
  .vl-search-bar-nominatim.ol-control.ol-search > button:before {
    content: none!important;
  }
  .vl-search-bar-nominatim.ol-control.ol-search > button:after {
    content: none!important;
  }
  .ol-search ul {
    color: #333;
    font-size:0.85em;
    max-width: 20.375em!important;
  }
  .ol-search ul li {
    display: block;
    color: #333;
    font-size:0.85em;
  }
  .info {
    display: inline-block;
    width: 100%;
  }
  .info a img {
    height: 100px;
    margin-right: .5em;
    float: left;
  }
</style>
