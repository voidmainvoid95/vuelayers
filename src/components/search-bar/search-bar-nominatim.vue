<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import SearchNominatim from 'ol-ext/control/SearchNominatim'
  import searchBar from '../../mixins/search-bar'
  export default {
    name: 'VlSearchBarNominatim',
    mixins: [
      searchBar,
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
        return new SearchNominatim({
          polygon: this.currentPolygon,
          viewbox: this.currentViewbox,
          bounded: this.currentBounded,
          url: this.currentUrl,
          target: this.currentTarget,
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
        },
        )
      },
    },
  }
</script>

<style scoped>

</style>
