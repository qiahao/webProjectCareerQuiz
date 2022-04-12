import { C } from './components/buildinFields'

// const regOn = /^on([A-Z])/
// var camelizeRE = /-(\w)/g
var hyphenateRE = /\B([A-Z])/g

// var camelize = cached(function (str) {
//   return str.replace(camelizeRE, function (_, c) {
//     return c ? c.toUpperCase() : ''
//   })
// })
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

// props 和 on从其他属性中获取
// const VUE_RENDER_KEYS = [
//   'props',
//   'on',
//   'style',
//   'class',
//   'ref',
//   'key',
//   'scopedSlots',
//   'directives',
//   'nativeOn',
//   'attrs'
// ]
// const toLowerCase = String.prototype.toLowerCase

export function getRenderData(config, propKeys = [], onKeys = []) {
  const {
    props = {},
    on = {},
    scopedSlots = [],
    style = [],
    class: classname = [],
    ref,
    key,
    directives = [],
    nativeOn = {},
    attrs = [],
    ...conf
  } = config || {}

  const res = { props, on, scopedSlots, style, class: classname, directives, nativeOn, attrs }
  if (ref != undefined) res.ref = ref
  if (key != undefined) res.key = key

  if (!config) return res
  for (const k in conf) {
    if (Object.hasOwnProperty.call(config, k)) {
      const hk = hyphenate(k)
      if (propKeys.includes(k) || propKeys.includes(hk)) {
        res.props[k] = config[k]
      } else if (onKeys.includes(k) || onKeys.includes(hk)) {
        res.on[k] = config[k]
      }
    }
  }
  return res
}
export function getPropsAndEvents(config, propKeys = [], onKeys = []) {
  const res = { props: {}, on: {} }
  if (!config) return res
  for (const k in config) {
    if (Object.hasOwnProperty.call(config, k)) {
      const hk = hyphenate(k)
      if (propKeys.includes(k) || propKeys.includes(hk)) {
        res.props[k] = config[k]
      } else if (onKeys.includes(k) || onKeys.includes(hk)) {
        res.on[k] = config[k]
      }
    }
  }
  return res
}

export function getFunctionData(data, ...args) {
  if (typeof data === 'function') return data(...args)
  else return data
}

// 处理事件名或属性冲突
export function getPropsWithAlias(obj = {}, keys) {
  var props = {}
  keys.forEach(k => {
    let [k1, k2] = k.split(':')
    if (!k2) k2 = k1 = k
    if (obj[k1] !== undefined) props[k2] = obj[k1]
    else if (obj[hyphenate(k1)] !== undefined) props[k2] = obj[hyphenate(k1)]
  })
  return props
}

export const getPropsByKeys = getPropsWithAlias

export function getFieldWithErrorHandler(field) {
  let field$ = field
  if (typeof field === 'string') {
    field$ = C[field] || field
  } else if (typeof field === 'function') {
    field$ = field()
  }

  if (!field$) {
    console.error(`field is illegal`)
    return null
  }
  return field$
}

export function getSlot(slots, key) {
  if (key && slots[key]) return slots[key]
}

export function getChildrenWithDefaultSlot(children = [], defaultSlot, props) {
  if (!defaultSlot) return children
  else return [].concat(children, defaultSlot(props))
}

function cached(fn) {
  var cache = Object.create(null)
  return function cachedFn(str) {
    var hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}
