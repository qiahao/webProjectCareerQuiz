import './components/styles.scss'
import TForm from './components/TForm/index'
import TTools from './components/TTools/index'
import TQuery from './components/TQuery/index'
import TTable from './components/TTable/index'
import TEdit from './components/TEdit/index.vue'
import TDropdown from './components/Widgets/TDropdown'
import TPagination from './components/TPagination/index'
import { TOpr, TOprConfirm, TOprConfirmDel } from './components/TOpr/index'
import C from './components/buildinFields'
import crudCreater, { install as crudInstaller } from './mixins/crud'
import crudChild from './mixins/crudChild'
import mixinVisible from './mixins/mixinVisible'

const Tcomponents = {
  TForm,
  TTools,
  TQuery,
  TTable,
  TEdit,
  TDropdown,
  TPagination,
  TOpr,
  TOprConfirm,
  TOprConfirmDel
}

const crud = {
  child: crudChild
}
Object.defineProperty(crud, 'crud', {
  get() {
    return crudCreater()
  }
})

export { crud, mixinVisible }

export default {
  install(vue, options = {}) {
    if (this.installed) return
    const {
      buildinFields,
      crud
      // crudChild

    } = options
    // reset or add buildinFields
    if (buildinFields) {
      for (const k in buildinFields) {
        if (Object.hasOwnProperty.call(buildinFields, k)) {
          const field = buildinFields[k]
          C[k] = field
        }
      }
    }
    crudInstaller(crud)

    // install Tcomponents
    for (const key in Tcomponents) {
      if (Object.hasOwnProperty.call(Tcomponents, key)) {
        vue.component(key, Tcomponents[key])
      }
    }

    this.installed = true
  }
}
