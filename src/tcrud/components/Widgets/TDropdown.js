import { renderDropdown } from './render'

export default {
  name: 'TDropdown',
  props: {
    title: { type: String, default: '更多' },
    actions: { type: Array, default: () => [] }
  },
  render() {
    return renderDropdown(this, {
      ...this.props,
      on: {
        command: function (cm) {
          this.$emit('command', cm)
        }
      }
    })
  }
}
