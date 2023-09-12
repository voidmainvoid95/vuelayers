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
  import { makeChangeOrRecreateWatchers, controlToggle } from '../../mixins'
  import { EPSG_3857 } from '../../ol-ext'
  import { transform } from 'ol/proj'

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
    created () {
      this::defineServices()
    },
    methods: {
      /**
       * Create GeolocationButton
       * @return {module:ol-ext/control/GeolocationButton~GeolocationButton}
       * @protected
       */
      createToggle () {
        const newGeolocationButton = new GeolocationButton({
          className: this.classes.join(' '),
          title: this.title,
          delay: this.delay,
        })
        newGeolocationButton.on('position', event => {
          if (event.coordinate) {
            const dataProjection = this.$mapVm.getDataProjection()
            if (dataProjection !== EPSG_3857) { event.coordinate = transform(event.coordinate, EPSG_3857, dataProjection) }
            this.$emit('position', event.coordinate)
          }
        })
        newGeolocationButton.getButtonElement().appendChild(this.$el)
        return newGeolocationButton
      },
    },
  }

  function defineServices () {
    Object.defineProperties(this, {
      $mapVm: {
        enumerable: true,
        get: () => this.$services?.mapVm,
      },
    })
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
