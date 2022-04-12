import TOprConfirm from './TOprConfirm'
import crudChild from '../../mixins/crudChild'

export default {
  props: {
    data: { type: Object, default: null },
    label: { type: String, default: '删除' },
    ...TOprConfirm.props
  },
  mixins: [crudChild],
  data() {
    return {}
  },
  methods: {},
  render(h) {
    const data = { props: { ...this._props }, scopedSlots: {} }
    if (!data.props.title) data.props.title = '确认要删除该数据?'
    if (!data.props.icon) data.props.icon = 'el-icon-delete'
    data.on = {
      confirm: () => {
        this.isInCrud ? this.crud.onDel(this.data) : this.$emit('del', this.data)
      }
    }

    return h(TOprConfirm, data, this.label)
  }
}
