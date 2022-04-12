export default {
  props: {
    visible: { type: Boolean }
  },
  computed: {
    visible$: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {
    visible(n, o) {
      if (this.visibleWatcher) this.visibleWatcher(n, o)
    }
  },
  methods: {
    // visibleWatcher(n, o) {}
  }
}
