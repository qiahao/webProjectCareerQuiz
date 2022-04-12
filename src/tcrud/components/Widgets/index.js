import render from './render'

export const TDropdown = {
  name: 'TDropdown',
  props: {
    title: { type: String, default: '' },
    fields: { type: Array, default: () => [] }
  },
  computed: {
    renderConfig() {
      return {
        ...this._props,
        on: { ...this.$listeners }
      }
    }
  },
  render(h) {
    return render(this, this.renderConfig)
  }
}
