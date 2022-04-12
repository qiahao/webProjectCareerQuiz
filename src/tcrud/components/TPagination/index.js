import { C } from '../buildinFields'
import render from './render'

export default {
  name: 'TPagination',
  inject: {
    crud: { default: null }
  },
  props: {
    ...C.pagination.props,
    isolate: { type: Boolean }
  },
  data() {
    return {}
  },
  computed: {
    renderConfig() {
      const _this = this
      const conf = {
        ...this._props
      }

      if (!this.isolate && this.crud) {
        conf['current-change'] = function (s) {
          _this.crud.pages.page = s
          _this.crud.query()
        }
      }
      Object.assign(conf, this.$listeners)
      return conf
    }
  },
  render(h) {
    return render(this, this.conf)
  }
}
