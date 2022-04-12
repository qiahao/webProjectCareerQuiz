import { C } from '../buildinFields'
import renderPagination from '../TPagination/render'
import { getRenderData, getPropsWithAlias } from '../../utils'
import { getChildrenWithDefaultSlot } from '../../utils'

const TABLE_PROPS = Object.keys(C.table.props)
const TABLECOLUMN_PROPS = Object.keys(C.tableColumn.props)
const TABLE_EVENTS = [
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  // 'current-change', 事件与pagination冲突 单独处理
  'header-dragend',
  'expand-change'
]
const TABLE_EVENTS_ALIAS = ['current-row-change:current-change']

export default function renderTable(vm, conf) {
  const h = vm.$createElement
  if (typeof conf.render == 'function') conf.render(h, vm, conf)
  const { fields, pagination } = conf
  const data$ = getRenderData(conf, TABLE_PROPS, TABLE_EVENTS)
  Object.assign(data$.on, getPropsWithAlias(conf, TABLE_EVENTS_ALIAS))

  // TODO
  if (vm.$scopedSlots.append) {
    data$.scopedSlots = data$.scopedSlots || {}
    data$.scopedSlots.append = vm.$scopedSlots.append
  }

  let children = fields.map(o => {
    if (o.slot && vm.$scopedSlots[o.slot]) return vm.$scopedSlots[o.slot](o)
    else return renderTableColumn(vm, o)
  })

  children = getChildrenWithDefaultSlot(children, vm.$scopedSlots.default)

  return h('div', { class: 't-table' }, [h(C.table, data$, children), pagination ? renderPagination(vm, conf) : null])
}

function renderTableColumn(vm, conf) {
  const h = vm.$createElement
  const { render, children, header } = conf
  const data$ = getRenderData(conf, TABLECOLUMN_PROPS)
  data$.scopedSlots = data$.scopedSlots || {}

  // 多级表头可通过配置nest = true 配合render数组使用
  if (children instanceof Array) {
    // nest = true && render 为数组，即为多级表头
    data$.scopedSlots.default = () => render.map(o => renderTableColumn(vm, o))
  } else if (typeof render === 'function') {
    // 非多级表头执行以下代码
    data$.scopedSlots.default = props => render(h, props, { vm })
  }
  // header
  if (typeof header === 'function') data$.scopedSlots.header = props => header(h, vm, props) || conf.label || '-'
  return h(C.tableColumn, data$)
}
