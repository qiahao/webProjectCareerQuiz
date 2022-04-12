import { renderDropdown, renderButtonLike } from '../Widgets/render'
import crudChild from '../../mixins/crudChild'
import { getChildrenWithDefaultSlot } from '../../utils'
import mixinToolsSortable from './mixinToolsSortable'

export default {
  props: {
    fields: { type: [Array, String], default: '' },
    tools: { type: [Array, String], default: '' } // 方便记忆
  },
  mixins: [crudChild, mixinToolsSortable],
  data() {
    return {}
  },
  computed: {
    fields$() {
      const actions = { ...this.crudActions, sort: this.actionSort } //  在crudActions 加入actionSort
      let fields = this.fields || this.tools || []
      if (typeof fields === 'string') fields = fields.split(',')
      return fields.map(o => formatAction(actions, o)).filter(o => o)
    },
    leftTools() {
      return this.fields$.filter(o => !o.placement || o.placement == 'left')
    },
    rightTools() {
      return this.fields$.filter(o => o.placement == 'right')
    }
  },
  methods: {
    renderLeftTools() {
      const h = this.$createElement
      let LeftTools = this.leftTools.map(this.renderToolItem)
      LeftTools = getChildrenWithDefaultSlot(LeftTools, this.$scopedSlots.default)

      return h('div', { class: 't-tools__left' }, LeftTools)
    },
    renderRightTools() {
      const h = this.$createElement
      return h('div', { class: 't-tools__right' }, this.rightTools.map(this.renderToolItem))
    },
    renderToolItem(conf) {
      const h = this.$createElement
      if (!conf) return console.error(conf + ' tool is not defined ')
      if (typeof conf.render === 'function') {
        return conf.render(h, this, conf)
      } else if (typeof conf.slot === 'string') {
        return this.$scopedSlots[conf.slot] && this.$scopedSlots[conf.slot]()
      } else {
        return this.renderItem(h, conf)
      }
    },
    renderItem(h, conf) {
      if (typeof conf.render === 'function') return conf.render(h, this, conf)
      if (conf.actions instanceof Array) return renderDropdown(this, conf)
      else return renderButtonLike(this, conf)
    }
  },
  render(h) {
    const Tools = [this.renderLeftTools(), this.renderRightTools()]
    return h('div', { class: 't-tools' }, Tools)
  }
}

function formatAction(actions, item) {
  if (!item) return null
  if (typeof item === 'string') return actions[item] || { slot: item }
  const { action, ...o } = item
  if (typeof action === 'string') return Object.assign({}, actions[action], o)
  else if (item.children) {
    const { children, ...oo } = item
    let _cs = children
    if (typeof children === 'string') _cs = children.split(',')
    if (_cs instanceof Array) oo.children = _cs.map(c => formatAction(actions, c)).filter(c => !!c)
    else oo.children = []
    return oo
  } else {
    return item
  }
}

// {
//   if (!o) return null
//   if (typeof o === 'string') return actions[o] || { slot: o }
//   let oo = oo.action
//   if (typeof oo === 'string' && (oo = actions[oo])) return { ...oo, ...o }

//   // const c = { ...o }
//   if (c.children instanceof Array && c.children.length) {
//     // dropdown item 支持增删改查

//     c.actions = c.actions
//       .map(c => {
//         if (typeof c === 'string') return actions[c]
//         else if (typeof c.action === 'string' && actions[c.action]) return { ...actions[c.action], ...c }
//         else return c
//       })
//       .filter(c => c)
//   }
//   return c
// })
