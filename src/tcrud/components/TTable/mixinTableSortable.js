import Sortable from 'sortablejs'

export default {
  data() {
    return {
      isSortEnable: false,
      sortableInstance: null
    }
  },
  methods: {
    onToggleSort() {
      if (!this.sortableInstance) return
      this.isSortEnable = this.sortableInstance.options.disabled = !this.sortableInstance.options.disabled
    },

    initSortable() {
      this.sortableInstance = new Sortable(this.$el.querySelector('.el-table__body-wrapper tbody'), {
        sort: true,
        animation: 300,
        disabled: true,
        onUpdate: e => {
          this.onSortUpdate(e)
        }
      })
      this.isSortEnable = this.sortableInstance.options.disabled
    },
    onSortUpdate(e) {
      console.log('onSortUpdate')
    }
    // onChangeSort(fn, params) {
    //   this.sortTable.options.sort = !this.sortTable.options.sort
    //   this.sortAble = this.sortTable.options.sort
    //   if (this.sortAble) {
    //     this.$message('你现在可以拖动修改排序了')
    //   } else {
    //     this.onConfirmSort(fn, params)
    //   }
    // },
    // onConfirmSort(fn, params) {
    //   const _t = this
    //   const sort = _t.dataSource.map((item, i) => {
    //     // item.dictCode 类型排序
    //     return {
    //       [params.id]: params.id == 'dictCode' ? item.dictCode : item.id,
    //       [params.sort]: i
    //     }
    //   })
    //   fn(sort).then(() => {
    //     this.$message({ type: 'success', message: '排序成功' })
    //   })
    // }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.sortable) this.initSortable()
    })
  }
}
