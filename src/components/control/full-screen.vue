<template>
  <i
    :id="vmId"
    :class="vmClass" />
</template>

<script>
  import { FullScreen } from 'ol/control'
  import { control, makeChangeOrRecreateWatchers } from '../../mixins'

  export default {
    name: 'VlFullScreen',
    mixins: [
      control,
    ],
    props: {
      label: String,
      labelActive: String,
      activeClassName: String,
      inactiveClassName: String,
      tipLabel: String,
      keys: Boolean,
    },
    computed: {
      classes () {
        return [
          this.className,
          this.vmClass,
          'ol-full-screen',
        ]
      },
    },
    watch: {
      .../*#__PURE__*/makeChangeOrRecreateWatchers([
        'label',
        'labelActive',
        'activeClassName',
        'inactiveClassName',
        'tipLabel',
        'keys',
      ]),
    },
    methods: {
      createControl () {
        return new FullScreen({
          className: this.classes.join('.').substring(1),
          label: this.label,
          labelActive: this.labelActive,
          activeClassName: this.activeClassName,
          inactiveClassName: this.inactiveClassName,
          tipLabel: this.tipLabel,
          keys: this.keys,
        })
      },
    },
  }
</script>

<style scoped>

</style>
