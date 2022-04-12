import { C } from '../buildinFields'
import crudChild from '../../mixins/crudChild'
import { getRenderData } from '../../utils'

export default {
  props: {
    data: { type: Object, default: null },
    fieldType: { type: String, default: 'button' },
    popIcon: { type: String, default: 'el-icon-question' },
    ...C.popconfirm.props,
    ...C.button.props,
    size: { type: String, default: 'mini' }
  },
  mixins: [crudChild],
  data() {
    return {}
  },
  methods: {},
  render(h) {
    const referenceProps = getRenderData(this._props, ['size', 'type', 'icon', 'plain'])
    const data = getRenderData(this._props, [
      'title',
      'confirm-button-text',
      'cancel-button-text',
      'confirm-button-type',
      'cancel-button-type',
      'icon-color',
      'hide-icon'
    ])
    data.class = 't-opr-confirm'
    if (this.popIcon) data.props.icon = this.popIcon
    data.scopedSlots = data.scopedSlots || {}
    data.scopedSlots.reference = () =>
      h(this.fieldType == 'button' ? C.button : C.link, referenceProps, this.$slots.default)

    data.on.confirm = () => this.$emit('confirm')
    data.on.cancel = () => this.$emit('cancel')

    return h(C.popconfirm, data)
  }
}
