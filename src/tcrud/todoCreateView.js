/**
 * commonView 支持 type: table search tools, 其他组件通过render函数渲染
 */
// import { cloneDeep } from 'lodash'
import render from '../renders/render'
import { cloneDeep } from 'lodash'
import { getFunctionData } from '../renders/utils'

export default function createCommonView(config) {
  if (!config) return

  const component = {
    data() {
      return { viewConfig: null }
    },
    mixins: []
  }

  const mixins = config.mixins

  if (isPlainObject(mixins) || mixins instanceof Array) {
    component.mixins = (component.mixins || []).concat(mixins)
  }

  component.created = function () {
    const viewConf = getFunctionData(config, this)
    if (!viewConf) return
    this.viewConfig = cloneDeep(viewConf)
    if (!this.viewConfig.fieldType) this.viewConfig.fieldType = 'view'
    this.viewConfig.children.forEach(o => {
      if (!o.ref) o.ref = o.fieldType
    })
  }
  // render()
  if (isPlainObject(config) && typeof config.render === 'function') {
    component.render = config.render
  } else {
    component.render = function () {
      return render(this, this.viewConfig)
    }
  }
  component.mixin = function (mixin) {
    component.mixns = (component.mixns || []).concat(mixin)
    return component
  }

  return component
}

function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
