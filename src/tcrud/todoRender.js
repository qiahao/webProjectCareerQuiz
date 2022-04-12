const renders = {}

export default function render(vm, conf, options) {
  const h = vm.$createElement
  if (!conf) return null
  if (typeof conf === 'function') return conf(h, vm, conf, options)
  if (!conf.fieldType && typeof conf.render === 'function') {
    return conf.render(h, vm, conf, options)
  }
  if (typeof conf.fieldType !== 'string') {
    console.error(`conf.fieldType expect string, but got ${typeof conf.fieldType}`)
    return null
  }

  const fieldType = conf.fieldType
  const render$ = renders[`render` + String.prototype.toUpperCase.call(fieldType[0]) + fieldType.slice(1)]
  if (!render$ && typeof conf.render === 'function') {
    return conf.render(h, vm, conf, options)
  } else if (!render$) {
    console.error(`conf.fieldType expect string, but got ${typeof field}`)
    return null
  }

  return render$(vm, conf, options)
}
