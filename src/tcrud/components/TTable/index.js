import render from './render'
import { C } from '../buildinFields'
import crudChild from '../../mixins/crudChild'
import mixinTableSortable from './mixinTableSortable'

export default {
  name: 'TTable',
  props: {
    fields: { type: Array, default: () => [] },
    ...C.table.props,
    ...C.pagination.props,
    loading: { type: Boolean },
    pagination: { type: Boolean, default: true }
  },
  mixins: [crudChild, mixinTableSortable],
  data() {
    return {}
  },
  computed: {
    // 格式化columns
    renderConfig() {
      const conf = {
        ref: 'table',
        ...this._props,
        directives: [{ name: 'loading', value: !this.isolate && this.crud ? this.crud.loading : this.loading }]
      }

      if (this.isInCrud) {
        const crud = this.crud
        conf.data = crud.list
        if (this.pagination && crud.pagination) {
          conf.total = crud.pages.total
          conf.currentPage = crud.pages.page
          conf.pageSize = crud.pages.size
          conf.pagination = true
        } else {
          conf.pagination = false
        }
      } else {
        if (this.pagination) {
          conf.total = this.total
          conf.currentPage = this.currentPage
          conf.pageSize = this.pageSize
          conf.pagination = true
        } else {
          conf.pagination = false
        }
      }
      // crud events
      const _this = this
      conf['selection-change'] = function (s) {
        if (_this.isInCrud) _this.crud.selected = s
        else _this.$emit('selection-change', s)
      }
      conf['size-change'] = function (s) {
        if (_this.isInCrud) _this.crud.pages.size = s
        else _this.$emit('size-change', s)
      }
      conf['current-change'] = function (s) {
        if (_this.isInCrud) {
          _this.crud.pages.page = s
          _this.crud.query()
        } else {
          _this.$emit('current-change', s)
        }
      }

      Object.assign(conf, this.$listeners)
      return conf
    }
  },
  render() {
    return render(this, this.renderConfig)
  }
}
