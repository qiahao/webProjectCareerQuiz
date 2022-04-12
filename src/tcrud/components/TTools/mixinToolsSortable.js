export default {
  props: {
    sortEnable: { type: Boolean, default: false }
  },
  data() {
    return {}
  },
  computed: {
    actionSort() {
      return {
        fieldType: 'button',
        label: this.sortEnable$ ? '保存排序' : '关闭排序',
        type: 'warning',
        icon: 'el-icon-sort',
        size: 'mini',
        command: 'sort',
        placement: 'right',
        click: this.onSort
      }
    },
    sortEnable$: {
      get() {
        if (this.isInCrud) {
          return this.crud.sortEnable
        } else {
          return this.sortEnable
        }
      },
      set(val) {
        if (this.isInCrud) {
          this.crud.sortEnable = val
        } else {
          this.$emit('update:sortEnable', val)
          this.$emit('changeSortEnable', val)
        }
      }
    }
  },
  methods: {
    onSort() {
      this.sortEnable = !this.sortEnable
      if (this.isInCrud) {
        this.crud.onSort()
      } else {
        this.$emit('click-sort', this.sortEnable)
      }
    }
  }
}
