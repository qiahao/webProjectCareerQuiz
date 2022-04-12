import mixinCrudPermission from './mixinCrudPermission'

export default {
  inject: {
    crud: { default: null }
  },
  props: {
    isolate: { type: Boolean, default: false }
  },
  data() {
    return {}
  },
  mixins: [mixinCrudPermission],
  computed: {
    isInCrud() {
      return !this.isolate && this.crud
    },
    crudActions() {
      // computed支持动态属性
      return {
        add: this.actionAdd,
        del: this.actionDel,
        edit: this.actionEdit,
        query: this.actionQuery,
        update: this.actionUpdate,
        download: this.actionDownload
      }
    },
    actionAdd() {
      return {
        fieldType: 'button',
        label: '新增',
        type: 'primary',
        icon: 'el-icon-plus',
        size: 'mini',
        command: 'add',
        click: this.onAdd
      }
    },
    actionDel() {
      return {
        fieldType: 'button',
        label: '删除',
        type: 'danger',
        icon: 'el-icon-delete',
        size: 'mini',
        command: 'del',
        click: this.onDel
      }
    },
    actionEdit() {
      return {
        fieldType: 'button',
        label: '编辑',
        type: 'primary',
        icon: 'el-icon-edit',
        size: 'mini',
        command: 'edit',
        click: this.onEdit
      }
    },
    actionQuery() {
      return {
        fieldType: 'button',
        label: '查询',
        type: 'primary',
        icon: 'el-icon-search',
        command: 'query',
        click: this.onQuery
      }
    },
    actionUpdate() {
      return {
        fieldType: 'button',
        label: '刷新',
        type: 'primary',
        icon: 'el-icon-search',
        command: 'update',
        click: this.update
      }
    },
    actionDownload() {
      return {
        fieldType: 'button',
        label: '导出',
        type: 'warnning',
        icon: 'el-icon-download',
        loading: this.crud.downloadLoading,
        command: 'download',
        click: this.onDownload
      }
    },
    // 此permission 覆盖mixinCrudPermission
    permission() {
      if (!this.isInCrud) {
        return this.permissionKey ? this.$permissions[this.permissionKey] : {}
      } else if (this.isInCrud) {
        if (this.permissionKey) {
          return this.$permissions[this.permissionKey] || {}
        } else {
          return this.crud.permission || {}
        }
      }
    }
  },
  methods: {
    // this.useChildOptions 由Crud.Child的mixins提供,
    // 独立组件
    onAdd() {
      if (this.isInCrud) {
        this.crud.onAdd()
      } else {
        this.$emit('onAdd')
      }
    },
    onDel(delItems) {
      if (this.isInCrud) {
        this.crud.onDel(delItems)
      } else {
        this.$emit('onDel', delItems)
      }
    },
    onEdit(editRow) {
      if (this.isInCrud) {
        this.crud.onEdit(editRow)
      } else {
        this.$emit('onEdit', editRow)
      }
    },
    onQuery() {
      if (this.isInCrud) {
        this.crud.onQuery()
      } else {
        this.$emit('onQuery')
        this.$emit('search')
      }
    },
    onDownload() {
      if (this.isInCrud) {
        this.crud.onDownload()
      } else {
        this.$emit('onDownload')
      }
    },
    onSubmitForm() {
      if (this.isInCrud) {
        this.crud.onSubmitForm()
      } else {
        this.$emit('onSubmit-form')
      }
    }
  },
  created() {
    // 方法别名
    this.search = this.onQuery
    this.update = () => {
      if (this.isInCrud) {
        this.crud.update()
      } else {
        this.$emit('update')
      }
    }
  }
}
