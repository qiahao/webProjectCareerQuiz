export default {
  data() {
    return {
      sortTable: null, // 排序的table对象
      sortTableRef: '' // 排序的table ref key 名称
    }
  },
  methods: {
    onSort() {
      const { hooks } = this.cc
      if (typeof hooks.beforeSort === 'function') hooks.beforeSort.call(this)
      if (!this.sortTable) return
      this.$message.success('排序已开启,请拖动表格进行排序')
      this.sortTable.onToggleSort()
    },
    sort(data) {
      const { server, hooks, message } = this.cc
      if (typeof server.sort !== 'function') {
        return Promise.reject({ _crudCode: -1, msg: 'server.sort is not a function' })
      }
      let params = data
      if (typeof hooks.beforeSort === 'function') {
        const beforeResult = hooks.beforeSort.call(this, params)
        if (beforeResult === false) return
        if (beforeResult !== true && beforeResult !== undefined) params = beforeResult // 返回值作为参数
      }
      this.sortLoading = true
      return server
        .sort(params)
        .then(res => {
          if (typeof hooks.afterSort === 'function') hooks.afterSort.call(this, res)
          if (message.success) this.$message.success(message.success)
          this.sortLoading = false
          this.query()
          return res
        })
        .catch(e => {
          this.sortLoading = false
          return Promise.reject(e)
        })
    },
    setSortTable() {
      if (this.sortTableRef) {
        this.sortTable = this.$refs[this.sortTableRef]
      } else if (this.$children) {
        const children = this.$children
        const l = children.length
        for (let i = 0; i < l; i++) {
          const o = children[i]
          if (o.$options.name === 'TTable') {
            this.sortTable = o
            break
          }
        }
      }
    }
  },
  mounted() {
    this.$nextTick(this.setSortTable)
  }
}
