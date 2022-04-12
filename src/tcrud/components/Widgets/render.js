import { C } from '../buildinFields'
import { getRenderData, getFunctionData } from '../../utils'

const BUTTON_PROP_KEYS = ['type', 'plain', 'icon', 'disabled', 'size']

const DROPDOWN_PROP_KEYS = ['splitButton', 'type', 'trigger', 'size']
const DROPDOWNITEM_PROP_KEYS = ['command', 'disabled', 'divided', 'icon']
const DefaultDropdownProps = {
  splitButton: true,
  type: 'primary',
  trigger: 'hover',
  size: 'small'
}

// 所以和button相同属性的小组件
export function renderButtonLike(vm, conf, data) {
  const h = vm.$createElement
  const { fieldType, label } = conf
  const data$ = getRenderData(conf, BUTTON_PROP_KEYS, ['click'])
  if (!data$.props.size) data$.props.size = 'mini'
  if (conf.icon) data$.props.icon = conf.icon
  if (!data$.props.type) data$.props.type = 'primary'
  if (typeof conf.disabled == 'function') data$.props.disabled = getFunctionData(conf.disabled, vm)
  const Field = C[fieldType || 'button']
  if (!Field) return null
  return h(Field, data$, label)
}

// renderDropdown
export function renderDropdown(vm, conf, data) {
  const h = vm.$createElement
  const data$ = getRenderData({ ...DefaultDropdownProps, ...conf }, DROPDOWN_PROP_KEYS, ['command'])
  data$.scopedSlots.dropdown = () => {
    return h(
      C.dropdownMenu,
      (conf.actions || []).map((o, i) => {
        const ItemData = getRenderData(o, DROPDOWNITEM_PROP_KEYS)
        if (o.command === undefined) ItemData.props.command = i
        return h(C.dropdownItem, ItemData, [renderButtonLike(vm, o, data)])
      })
    )
  }

  return h(C.dropdown, data$, [conf.title || conf.label || '更多'])
}

// icon
// function elIcon(icon) {
//   elIcon.cached = elIcon.cached || {}
//   if (elIcon.cached[icon]) return elIcon.cached[icon]
//   let icon$ = icon
//   if (!/^el-icon-/.test(icon)) icon$ = `el-icon-${icon}`
//   return (elIcon.cached[icon] = icon$)
// }
