import { C } from '../buildinFields'
import { getRenderData, getPropsByKeys, getSlot } from '../../utils'
import { getChildrenWithDefaultSlot } from '../../utils'

const DEFAULT_FORM_PROPS = {
  labelWidth: '100px'
}
const DEFAULT_COL_PROPS = {
  span: 12
}
const DEFAULT_FIELD_PROPS = {
  clearable: true
}

const FORM_PROP_KEYS = Object.keys(C.form.props) // ['rules', 'inline', 'model', 'labelWidth', 'size']
const ROW_PROP_KEYS = ['gutter']
const COL_PROP_KEYS = ['span']
// prop 应该在rules存在对应key值时 进行赋值
const FORM_ITEM_PROP_KEYS = Object.keys(C.formItem.props) // ['label', 'labelWidth', 'required', 'rules', 'size']
const FORM_FIELD_PROP_KEYS = Object.keys(C.input.props)

export default function renderForm(vm, conf, formModel) {
  const h = vm.$createElement
  if (typeof conf.render === 'function') conf.render(h, formModel, { vm, __config: conf })
  const formData = getRenderData(Object.assign({}, DEFAULT_FORM_PROPS, conf), FORM_PROP_KEYS)

  if (!formData.props.model) formData.props.model = formModel || {}
  const hasLayout = !conf.inline && !!conf.layout
  let formItems = (conf.fields || []).map(o => {
    const slotFun = getSlot(vm.$scopedSlots, o.slot)
    const FormItem = slotFun ? slotFun(formData.props.model) : renderFormItem(vm, { ...o, formRules: formData.props.rules }, formData.props.model)
    if (hasLayout) {
      // +++++处理布局代码++++
      const colData = { props: {} }
      colData.props = getPropsByKeys(Object.assign({}, DEFAULT_COL_PROPS, conf, o), COL_PROP_KEYS)
      return h(C.col, colData, [FormItem])
      // +++++处理布局代码end++++
    } else {
      return FormItem
    }
  })

  formItems = getChildrenWithDefaultSlot(formItems, vm.$scopedSlots.default)
  let children
  if (hasLayout) {
    const rowData = { props: getPropsByKeys(conf, ROW_PROP_KEYS) }
    children = [h(C.row, rowData, formItems)]
  } else {
    children = formItems
  }
  return h(C.form, formData, children)
}

function renderFormItem(vm, conf, formModel) {
  const h = vm.$createElement
  // renderFormItem 配置的render 或者renderField函数都只用于渲染表单元素
  if (typeof conf.render === 'function') return conf.render(h, formModel, { vm, __config: conf })
  const formItemData = getRenderData(conf, FORM_ITEM_PROP_KEYS)
  // 是否需要添加prop属性 用于表单校验
  if (conf.formRules && conf.prop && conf.formRules[conf.prop]) formItemData.props.prop = conf.prop
  else delete formItemData.props.prop

  let fieldConf = conf
  // 装配表单元素的属性
  if (typeof fieldConf.renderField === 'function') {
    fieldConf = { ...conf }
    fieldConf.render = fieldConf.renderField
  }
  return h(C.formItem, formItemData, [renderFormField(vm, fieldConf, formModel)])
}

// 表单元素
function renderFormField(vm, conf, formModel) {
  const h = vm.$createElement
  if (typeof conf.render === 'function') return conf.render(h, formModel, { vm, __config: conf })
  const fieldType = conf.fieldType || 'input' // 默认为input组件
  if (typeof fieldType === 'function') return fieldType(h, formModel, { vm, __config: conf })
  const field = C[fieldType]
  if (!field) {
    console.warn('fieldType ${fieldType} is not defined on buildin Components')
    return null
  }
  const fieldData = getRenderData({ ...DEFAULT_FIELD_PROPS, ...conf }, FORM_FIELD_PROP_KEYS)
  const prop = conf.prop
  const matchVModel = formModel && prop
  const placeholder = conf.placeholder
  if (matchVModel) fieldData.props.value = formModel[prop]
  const onInput = fieldData.on && fieldData.on['input']
  fieldData.on.input = val => {
    if (matchVModel) formModel[prop] = val
    if (typeof onInput === 'function') onInput.call(vm, val)
  }
  if (placeholder) {
    fieldData.attrs = fieldData.attrs || {}
    fieldData.attrs.placeholder = placeholder
  }

  let children
  let options = conf.options
  if (fieldType == 'select') {
    if (typeof options == 'string') options = vm[options] || []
    if (typeof options == 'function') options = options()
    if (!options || !(options instanceof Array)) options = []
    children = options.map(o => h(C.option, { props: { ...o } }))
  }

  return h(field, fieldData, children)
}
