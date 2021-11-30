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
  import { controlSearchBar, makeChangeOrRecreateWatchers } from '../../mixins'

  export default {
    name: 'VlSearchBarNominatim',
    mixins: [
      controlSearchBar,
    ],
    props: {
      url: {
        type: String,
        default: 'https://nominatim.openstreetmap.org/search',
      },
      polygon: {
        type: Boolean,
        default: false,
      },
      bounded: {
        type: Boolean,
        default: false,
      },
      viewbox: {
        type: Array,
        default: () => { undefined },
      },
    },
    watch: {
      .../*#__PURE__*/makeChangeOrRecreateWatchers([
        'url',
        'polygon',
        'bounded',
      ], [
        'viewbox',
      ]),
    },
    methods: {
      /**
       * Create SearchNominatim
       * @return {module:ol-ext/control/SearchNominatim~SearchNominatim}
       * @protected
       */
      createSearchBar () {
        const newSearchBar = new SearchNominatim({
          className: this.vmClass,
          polygon: this.polygon,
          viewbox: this.viewbox,
          bounded: this.bounded,
          url: this.url,
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
