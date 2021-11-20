<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import SearchPhoton from 'ol-ext/control/SearchPhoton'
  import searchBar from '../../mixins/search-bar'

  export default {
    name: 'VlSearchBarPhoton',
    mixins: [
      searchBar,
    ],
    props: {
      url: {
        type: String,
      },
      handleResponse: {
        type: Function,
      },
      lang: {
        type: String,
      },
      position: {
        type: Boolean,
      },
      getTitle: {
        type: Function,
      },
    },
    data () {
      return {
        currentUrl: 'https://photon.komoot.io/api/',
        currentHandleResponse: undefined,
        currentLang: undefined,
        currentPosition: false,
        currentGetTitle: undefined,
      }
    },
    created () {
      this.currentUrl = this.url || this.currentUrl
      this.currentHandleResponse = this.handleResponse || this.currentHandleResponse
      this.currentLang = this.lang || this.currentLang
      this.currentPosition = this.position || this.currentPosition
      this.currentGetTitle = this.getTitle || this.currentGetTitle
    },
    methods: {
      createSearchBar () {
        return new SearchPhoton({
          url: this.currentUrl,
          handleResponse: this.currentHandleResponse,
          lang: this.currentLang,
          position: this.currentPosition,
          getTitle: this.getTitle,
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
        })
      },
    },
  }
</script>

<style scoped>

</style>
