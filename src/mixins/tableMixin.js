export default {
  data() {
    return {
      list: [],
      selectList: [],
      pageNum: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      total: 0,
      pageLayout: 'total, sizes, prev, pager, next, jumper'
    }
  },
  watch: {},
  computed: {
    selectLength() {
      return this.selectList.length
    },
    pageOption() {
      return {
        currentPage: this.pageNum,
        pageSize: this.pageSize,
        pageSizes: this.pageSizes,
        total: this.total,
        layout: this.pageLayout
      }
    }
  },
  methods: {
    loadList() {
      return this.get().then(data => {
        this.list = data.rows
        this.total = data.total
        return data
      })
    },
    onSearch() {
      // 重置
      this.selectList = []
      this.pageNum = 1
      this.loadList()
    },
    // 表单重置
    onReset() {
      if (this.$refs.searchForm) {
        this.$refs.searchForm.resetFields()
      }
    },
    handlerSelectionChange(selection) {
      this.selectList = selection
    },
    handlerCurrentChange(p) {
      this.pageNum = p
      this.loadList()
    },
    handlerSizeChange(sz) {
      this.pageSize = sz
      this.onSearch()
    },
    assignQuery(query) {
      return { pageNum: this.pageNum, pageSize: this.pageSize, ...query }
    }
  }
}
