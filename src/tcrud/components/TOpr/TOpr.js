import { renderDropdown, renderButtonLike } from '../Widgets/render'
import crudChild from '../../mixins/crudChild'
import { getChildrenWithDefaultSlot } from '../../utils'

const DefaultDropdownAction = {}

export default {
  props: {
    data: { type: Object, default: null },
    fields: { type: [Array, String], default: '' }
  },
  mixins: [crudChild],
  data() {
    return {}
  },
  computed: {
    fields$() {
      const fields = this.fields && typeof this.fields === 'string' ? this.fields.split(',') : this.fields || []
      return fields
        .map(o => {
          const actions = this.crudActions
          if (typeof o === 'string') return actions[o] || { slot: o }
          if (typeof o.action === 'string' && actions[o.action]) return { ...actions[o.action], ...o }
          // maybe drowdown
          let oo = null
          if (o instanceof Array) oo = { ...DefaultDropdownAction, actions: [...o] }
          else oo = { ...o }
          // dropdown item 支持编辑、删除
          if (oo.actions instanceof Array) {
            oo.actions = oo.actions
              .map(c => {
                if (typeof c === 'string') return actions[c] ? { ...actions[c], fieldType: 'link' } : null
                else return { ...c, fieldType: 'link' }
              })
              .filter(c => c)
          }
          return oo
        })
        .filter(o => o)
    }
  },
  methods: {
    onEdit() {
      if (this.isInCrud) this.crud.onEdit(this.data)
      else this.$emit('edit', this.data)
    },
    onDel() {
      if (this.isInCrud) this.crud.onDel(this.data)
      else this.$emit('del', this.data)
    },
    renderItem(h, conf) {
      if (typeof conf.render === 'function') return conf.render(h, this, conf)
      if (conf.actions instanceof Array) return renderDropdown(this, conf)
      else return renderButtonLike(this, conf)
    }
  },
  render(h) {
    return h(
      'div',
      { class: 't-opr' },
      getChildrenWithDefaultSlot(
        this.fields$.map(conf => this.renderItem(h, conf)),
        this.$scopedSlots.default
      )
    )
  }
}
