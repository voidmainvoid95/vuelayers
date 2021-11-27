<template>
  <i
    :id="vmId"
    :class="vmClass"
    style="display: none !important;" />
</template>

<script>
  import SearchPhoton from 'ol-ext/control/SearchPhoton'
  import { controlSearchBar, makeChangeOrRecreateWatchers } from '../../mixins'

  export default {
    name: 'VlSearchBarPhoton',
    mixins: [
      controlSearchBar,
    ],
    props: {
      url: {
        type: String,
        default: 'https://photon.komoot.io/api/',
      },
      position: {
        type: Boolean,
        default: false,
      },
      handleResponse: Function,
      lang: String,
      getTitle: Function,
    },
    watch: {
      .../*#__PURE__*/makeChangeOrRecreateWatchers([
        'url',
        'position',
        'bounded',
        'lang',
      ], [
        'handleResponse',
        'getTitle',
      ]),
    },
    methods: {
      createSearchBar () {
        return new SearchPhoton({
          url: this.url,
          handleResponse: this.handleResponse,
          lang: this.lang,
          position: this.position,
          getTitle: this.getTitle,
          title: this.title,
          reverseTitle: this.reverseTitle,
          placeholder: this.placeholder,
          inputLabel: this.inputLabel,
          collapsed: this.collapsed,
          noCollapse: this.noCollapse,
          typing: this.typing,
          minLength: this.minLength,
          maxItems: this.maxItems,
          centerOnSelect: this.centerOnSelect,
          zoomOnSelect: this.zoomOnSelect,
        })
      },
    },
  }
</script>

<style>
  .ol-search ul {
    color: #333;
    font-size:0.85em;
    max-width: 21em;
  }
  .ol-search ul i {
    display: block;
    color: #333;
    font-size:0.85em;
  }
</style>
