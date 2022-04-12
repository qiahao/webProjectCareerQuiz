import mixinCrudPermission from './mixinCrudPermission' // 权限
import mixinCrudTableSortable from './mixinCrudTableSortable' // 表格拖拽排序

/**
 * 默认文本消息
 */
const DefaultMessage = {
  editTitle: '编辑',
  addTitle: '新增',
  success: '操作成功',
  addSuccess: '新增成功',
  editSuccess: '修改成功',
  delSuccess: '删除成功',
  downloadSuccess: '下载成功',
  delConfirm: '此操作将永久删除数据, 是否继续?',
  delEmptyMessage: '请选择要删除的数据'
}

const DefaultConfig = {
  isBatchDel: true,
  pagination: true
}
/**
 * 基础配置
 * 可通过 Vue.use(TCrud, options) 修改
 */
const DefaultOptions = {
  queryPageStart: 0,
  mixins: [],
  message: {},
  config: {},
  queryParamsGetter() {
    const { config } = this.cc
    const params = { ...this.queryModel }
    if (config.pagination !== false) {
      params.page = this.pages.page - (1 - DefaultOptions.queryPageStart)
      params.size = this.pages.size
    }
    return params
  },
  queryResponseHandler(res) {
    if (this.hasPagination !== false) {
      this.pages.total = res.totalElements
      this.list = res.content || []
    } else {
      this.list = res.content || []
    }
  },
  downloadResponseHandler(res, params) {}
}

/**
 *
 * @param {Object} options
 * @param {Object} options.crudServer                  接口相关的配置: 增 删 改 查
 * @param {Function} options.crudServer.add            增
 * @param {Function} options.crudServer.del            删
 * @param {Function} options.crudServer.edit           改
 * @param {Function} options.crudServer.query          查
 * @param {Function} options.crudServer.download       导出|下载
 * @param {Function} options.crudHooks.onAdd      在onAdd时需要小修改又不想重写onAdd方法时可以使用该hook
 * @param {Function} options.crudHooks.onDel      在onDel时需要小修改又不想重写onDel方法时可以使用该hook: 很少使用
 * @param {Function} options.crudHooks.onEdit     在onEdit时需要小修改又不想重写onEdit方法时可以使用该hook
 * @param {Function} options.crudHooks.onQuery    在onQuery时需要小修改又不想重写onQuery方法时可以使用该hook: 很少使用
 * @param {Function} options.crudHooks.onDownload    在onDownload时需要小修改又不想重写onDownload方法时可以使用该hook: 很少使用
 * @param {Function} options.crudHooks.beforeAdd      调用add接口前执行, 可以返回false 阻止接口调用; 新增和编辑在““提交””时的数据处理一般是一致的, 因此在设置了某一个hook时会共用
 * @param {Function} options.crudHooks.beforeDel      调用del接口前执行, 可以返回false 阻止接口调用
 * @param {Function} options.crudHooks.beforeEdit     调用edit接口前执行, 可以返回false 阻止接口调用; 新增和编辑在““提交””时的数据处理一般是一致的, 因此在设置了某一个hook时会共用
 * @param {Function} options.crudHooks.beforeQuery    调用query接口前执行, 可以返回false 阻止接口调用
 * @param {Function} options.crudHooks.beforeDownload    调用download接口前执行, 可以返回false 阻止接口调用
 * @param {Function} options.crudHooks.afterAdd       调用add接口后执行, 可以修改默认行为
 * @param {Function} options.crudHooks.afterDel       调用del接口后执行, 可以修改默认行为
 * @param {Function} options.crudHooks.afterEdit      调用edit接口后执行, 可以修改默认行为
 * @param {Function} options.crudHooks.afterQuery     调用query接口后执行, 可以修改默认行为
 * @param {Function} options.crudHooks.afterDownload     调用download接口后执行, 可以修改默认行为
 * @param {Object} options.crudConfig
 * @param {Object} options.crudConfig.autoQuery        初始化时调用查询接口
 * @param {Object} options.crudConfig.pagination       false | true
 * @param {Object} options.crudConfig.batchDel         删除接口是否支持批量删除, 影响删除接口的传参
 * @param {Object} options.crudConfig.singleDel         删除接口是否只能单个=删除, 影响删除接口的传参
 * @param {Object} options.crudConfig.addModel         新增表单的初始值; 允许子组件实时修改
 * @description server / hooks 和 config的部分属性允许在Crud.Child子组件中执行时实时修改, 在使用以上配置项时需特别留意
 * @returns
 */

function crud() {
  const CRUD = {
    provide() {
      return { crud: this }
    },
    data() {
      return {
        queryModel: {}, // 引用页面重写
        queryRules: {}, // 引用页面重写
        addModel: null, //
        editModel: null, // 引用页面重写
        editMode: 0, // 0 新增; 1 编辑
        addVisible: false,
        loading: false,
        addLoading: false,
        delLoading: false,
        downloadLoading: false,
        pagination: true,
        list: [],
        pages: {
          page: 1,
          size: 20,
          total: 0
        },
        current: null, // 当前编辑数据
        selected: []
      }
    },
    mixins: [mixinCrudPermission, mixinCrudTableSortable].concat(DefaultOptions.mixins),
    computed: {
      // 同步addVisible
      editVisible: {
        get() {
          return this.addVisible
        },
        set(val) {
          this.addVisible = val
        }
      },
      editLoading: {
        get() {
          return this.addLoading
        },
        set(val) {
          this.addLoading = val
        }
      },
      editTitle() {
        const { message } = this.cc
        return this.editMode === 1 ? message.editTitle : message.addTitle
      },
      formModel() {
        return this.editMode === 1 ? this.editModel || {} : this.addModel || {}
      }
    },
    methods: {
      // 增删改查事件处理
      onAdd() {
        // 初始化数据
        this.editMode = 0
        const { hooks, config } = this.cc
        this.addModel = JSON.parse(JSON.stringify(config.addModel || {}))
        if (typeof hooks.onAdd === 'function') this.addModel = hooks.onAdd.call(this, this.addModel)
        this.addVisible = true
      },
      onDel(items) {
        // 点击删除 确认后调用删除
        const { hooks, message } = this.cc
        let delItems = items ? (items instanceof Array ? items : [items]) : this.selected
        if (typeof hooks.onDel === 'function') delItems = hooks.onDel.call(this, delItems)
        if (!delItems || !delItems.length) this.$message.warn(message.delEmptyMessage)
        this.$confirm(message.delConfirm, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => this.del(delItems))
      },
      onEdit(row) {
        this.editMode = 1
        this.current = row
        this.editModel = { ...row }
        const { hooks } = this.cc
        if (typeof hooks.onEdit === 'function') this.editModel = hooks.onEdit.call(this, this.editModel)
        this.editVisible = true
      },
      onQuery() {
        this.pages.page = 1 // 可以不判断是否有分页, 无分页时已经忽略了pages信息
        this.query()
      },
      onDownload() {
        this.download()
      },
      // 新增和编辑的表达校验在具体的业务中实现,crud不处理
      onSubmitForm(data) {
        if (this.editMode === 1) this.edit(data)
        else this.add(data)
      },
      add(data) {
        const { server, hooks, message } = this.cc
        // 未传add方法,静默处理
        // 传了add方法,但不是函数会提示错误
        if (typeof server.add !== 'function') {
          return Promise.reject({ _crudCode: -1, msg: 'server.add is not a function' })
        }
        let params = data || { ...this.formModel }
        if (typeof hooks.beforeAdd === 'function') {
          const beforeResult = hooks.beforeAdd.call(this, params)
          if (beforeResult === false) return
          if (beforeResult !== true && beforeResult !== undefined) params = beforeResult // 返回值作为参数
        }
        this.addLoading = true
        return server
          .add(params)
          .then(res => {
            if (typeof hooks.afterAdd === 'function') hooks.afterAdd.call(this, res)
            if (message.addSuccess) this.$message.success(message.addSuccess)
            this.addLoading = false
            this.addVisible = false
            this.query()
            return res
          })
          .catch(e => {
            this.addLoading = false
            return Promise.reject(e)
          })
      },
      del(items) {
        // 未传del方法,静默处理
        // 传了del方法,但不是函数会提示错误
        const { server, hooks, config, message } = this.cc
        if (typeof server.del !== 'function') {
          return Promise.reject({ _crudCode: -1, msg: 'server.del is not a function' })
        }
        let ids = items.map(o => o[config.primaryKey || 'id'])
        if (typeof hooks.beforeDel === 'function') {
          const beforeResult = hooks.beforeDel.call(this, items)
          if (beforeResult === false) return
          if (beforeResult !== true && beforeResult !== undefined) ids = beforeResult // 返回值作为参数
        }
        // 接口不支持批量删除时
        const singleDel = !config.isBatchDel || config.isSingleDel
        if (singleDel) ids = ids[0]
        this.delLoading = true
        return server
          .del(ids)
          .then(res => {
            if (message.delSuccess) this.$message.success(message.delSuccess)
            if (typeof hooks.afterDel === 'function') hooks.afterDel.call(this, res)
            // 删除后 修正查询分页
            const delItemLength = singleDel ? 1 : ids.length
            if (config.pagination && this.pages.page > DefaultOptions.queryPageStart && this.list.length === delItemLength) {
              this.pages.page--
            }
            this.delLoading = false
            this.query()
            return res
          })
          .catch(e => {
            this.delLoading = false
            return Promise.reject(e)
          })
      },
      edit(data) {
        // 未传edit方法,静默处理
        // 传了edit方法,但不是函数会提示错误
        const { server, hooks, message } = this.cc
        if (typeof server.edit !== 'function') {
          return Promise.reject({ _crudCode: -1, msg: 'server.edit is not a function' })
        }
        let params = data || { ...this.formModel }
        if (typeof hooks.beforeEdit === 'function') {
          const beforeResult = hooks.beforeEdit.call(this, params)
          if (beforeResult === false) return
          if (beforeResult !== true && beforeResult != undefined) params = beforeResult // 返回值作为参数
        }

        this.editLoading = true
        return server
          .edit(params)
          .then(res => {
            if (message.editSuccess) this.$message.success(message.editSuccess)
            if (typeof hooks.afterEdit === 'function') hooks.afterEdit.call(this, res)
            this.editLoading = false
            this.editVisible = false
            this.query()
            return res
          })
          .catch(e => {
            this.editLoading = false
            return Promise.reject(e)
          })
      },
      query(data) {
        // 未传query方法,静默处理
        // 传了query方法,但不是函数会提示错误
        const { server, hooks } = this.cc
        if (typeof server.query !== 'function') {
          return Promise.reject({ _crudCode: -1, msg: 'server.query is not a function' })
        }
        let params = data || this.getQueryParams()
        if (typeof hooks.onQuery === 'function') params = hooks.onQuery.call(this, params)
        if (typeof hooks.beforeQuery === 'function') {
          const beforeResult = hooks.beforeQuery.call(this, params)
          if (beforeResult === false) return
          if (beforeResult !== true && beforeResult !== undefined) params = beforeResult // 返回值作为参数
        }

        this.loading = true
        return server
          .query(params)
          .then(res => {
            if (typeof DefaultOptions.queryResponseHandler === 'function') DefaultOptions.queryResponseHandler.call(this, res)
            if (typeof hooks.afterQuery === 'function') hooks.afterQuery.call(this, res, params)
            setTimeout(() => {
              this.loading = false
            }, 160)
            return res
          })
          .catch(e => {
            this.loading = false
            return Promise.reject(e)
          })
      },
      download(data) {
        // 未传download方法,静默处理
        // 传了download方法,但不是函数会提示错误
        const { server, hooks, message } = this.cc
        if (typeof server.download !== 'function') {
          return Promise.reject({ _crudCode: -1, msg: 'server.download is not a function' })
        }
        let params = data || this.getQueryParams()
        if (typeof hooks.onDownload === 'function') params = hooks.onDownload.call(this, params)
        if (typeof hooks.beforeDownload === 'function') {
          const beforeResult = hooks.beforeDownload.call(this, params)
          if (beforeResult === false) return
          if (beforeResult !== true && beforeResult !== undefined) params = beforeResult // 返回值作为参数
        }

        this.downloadLoading = true
        return server
          .download(params)
          .then(res => {
            // download 业务逻辑修改
            if (message.downloadSuccess) this.$message.success(message.downloadSuccess)
            if (typeof DefaultOptions.downloadResponseHandler === 'function') {
              DefaultOptions.downloadResponseHandler.call(this, res, params)
            }
            if (typeof hooks.afterDownload === 'function') hooks.afterDownload.call(this, res, params)
            setTimeout(() => {
              this.downloadLoading = false
            }, 160)
            return res
          })
          .catch(e => {
            this.downloadLoading = false
            return Promise.reject(e)
          })
      },
      // 可重置, 查询参数获取
      getQueryParams() {
        return typeof DefaultOptions.queryParamsGetter === 'function' ? DefaultOptions.queryParamsGetter.call(this) : { ...this.queryModel }
      }
    },
    created() {
      // 设置this.cc = crudConfig
      const opts = this.$options
      const cc = (this.cc = {
        server: Object.assign({}, opts.server || {}),
        hooks: Object.assign({}, opts.hooks || {}),
        config: Object.assign({}, DefaultConfig, DefaultOptions.config, opts.config || {}),
        message: Object.assign({}, DefaultMessage, DefaultOptions.message, opts.message || {})
      })

      // 新增和编辑在提交时的数据处理一般是一致的, 因此在设置了某一个hook时会共用
      if (!cc.hooks.beforeAdd) cc.hooks.beforeAdd = cc.hooks.beforeEdit
      if (!cc.hooks.beforeEdit) cc.hooks.beforeEdit = cc.hooks.beforeAdd

      // 方法别名
      this.search = this.onQuery
      this.update = this.query
      // 初始化时调用
      if (this.cc.config.autoQuery !== false) this.onQuery()
    }
  }

  return CRUD
}

export default crud
export function install(opts) {
  Object.assign(DefaultOptions, opts || {})
  DefaultOptions.config = opts.config || {}
  DefaultOptions.message = opts.message || {}
}
