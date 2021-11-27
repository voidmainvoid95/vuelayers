<template>
  <i
    :id="vmId"
    :class="vmClass">
    <slot>
      <FontAwesomeIcon icon="location-arrow" />
    </slot>
  </i>
</template>

<script>
  import GeolocationButton from 'ol-ext/control/GeolocationButton'
  import { makeChangeOrRecreateWatchers } from '../../mixins'
  import controlToggle from '../../mixins/control-toggle'

  export default {
    name: 'VlGeolocationButton',
    mixins: [
      controlToggle,
    ],
    props: {
      delay: {
        type: Number,
        default: 2000,
      },
    },
    computed: {
      classes () {
        return [
          this.className,
          this.vmClass,
        ]
      },
    },
    watch: {
      .../*#__PURE__*/makeChangeOrRecreateWatchers([
        'delay',
      ]),
    },
    methods: {
      createControl () {
        const newGeolocationButton = new GeolocationButton({
          className: this.classes.join(' '),
          title: this.title,
          delay: this.delay,
        })
        newGeolocationButton.on('position', event => {
          if (event.coordinate) { this.$emit('position', event.coordinate) }
        })
        newGeolocationButton.getButtonElement().appendChild(this.$el)
        return newGeolocationButton
      },
    },
  }
</script>

<style scoped>
  .vl-geolocation-button.ol-control.ol-geobt {
    top: 3em;
    left: auto;
    right: 0.5em;
    bottom: auto;
  }
</style>

<style>
  .vl-geolocation-button.ol-control.ol-geobt > button:before {
    content: none!important;
  }
  .vl-geolocation-button.ol-control.ol-geobt > button:after {
    content: none!important;
  }
</style>
