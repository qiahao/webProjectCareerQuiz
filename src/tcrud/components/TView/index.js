/**
 * renderView 用于渲染页面，和其他render函数不同，
 * 其他render函数共享同一个组件实例
 * renderView 会为每个children生成一个独立的组件
 *
 */
import { getFunctionData } from '../../utils'
import TForm from '../TForm/index'
import TTools from '../TTools/index'
import TQuery from '../TQuery/index'
import TTable from '../TTable/index'

const viewCompoMap = {
  form: TForm,
  query: TQuery,
  tools: TTools,
  table: TTable
}

export default function renderView(vm, conf, options) {
  const h = vm.$createElement
  const children = (conf.children || []).map(o => renderViewChildren(vm, o, options))

  return h('div', { class: ['t-view', conf.customClass] }, children)
}

function renderViewChildren(vm, conf, options) {
  const h = vm.$createElement
  if (typeof conf === 'function') return conf(h, vm, conf, options)
  if (!conf || !conf.fieldType || typeof conf.fieldType !== 'string') {
    console.error(`conf.fieldType expect string, but got ${typeof field}`)
    return null
  }

  const Compo = viewCompoMap[conf.fieldType]

  if (!Compo) {
    console.error(`conf.fieldType expect ${Object.keys(viewCompoMap)}`)
    return null
  }
  // 解析出的属性是用于组件的
  // const data$ = getRenderDataFromRenderConfig(conf, vm)
  const data$ = genRenderData(vm, conf)
  return h(Compo, data$)
}

function genRenderData(vm, conf) {
  const data = {
    props: {},
    on: conf.on || {}
  }
  const props = data.props
  const { fieldType, fields } = conf

  if (fieldType == 'table') {
    const { data, load, loadDataOnCreated, pagination } = conf
    if (fields) props.columns = getFunctionData(fields, vm)
    if (data !== undefined) props.data = getFunctionData(data, vm)
    if (loadDataOnCreated !== undefined) {
      props.loadDataOnCreated = getFunctionData(loadDataOnCreated, vm)
    }
    if (pagination !== undefined) {
      props.pagination = getFunctionData(pagination, vm)
    }
    if (load) props.load = load
  } else if (fieldType == 'form' || fieldType == 'search') {
    const { layout, formModel } = conf
    if (fields) props.fields = getFunctionData(fields, vm)
    if (layout) props.layout = getFunctionData(layout, vm)
    if (formModel) props.formModel = getFunctionData(formModel, vm)
  } else if (fieldType == 'tools') {
    if (fields) props.fields = getFunctionData(fields, vm)
  }

  return data
}
