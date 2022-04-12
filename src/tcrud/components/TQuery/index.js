import { C } from '../buildinFields'
import TForm from '../TForm/index'
import crudChild from '../../mixins/crudChild'

export default {
  name: 'TQuery',
  props: {
    ...TForm.props,
    inline: { type: Boolean, default: true }
  },
  mixins: [crudChild],
  data() {
    return {}
  },
  computed: {
    refForm() {
      return this.$refs.form.$refs.form
    },
    model$() {
      return this.isInCrud ? this.model || this.crud.queryModel : this.model
    }
  },
  methods: {
    onSearch() {
      this.refForm.validate(valid => {
        if (valid) {
          if (this.isInCrud) {
            this.crud.query()
          } else {
            this.$emit('search', this.model$)
            this.$emit('query', this.model$) // 同名事件
          }
        }
      })
    },
    onReset() {
      if (
        this.isInCrud &&
        !this.model &&
        this.crud.queryModel &&
        this.initParamsString &&
        !this.refForm.fields.length
      ) {
        this.crud.queryModel = JSON.parse(this.initParamsString)
      } else {
        this.refForm.resetFields()
      }
      this.$emit('reset', this.model$)
    },
    renderOperation(h) {
      return h('div', { class: 't-qeury__operations' }, [
        h(C.button, { props: { type: 'primary', size: 'mini' }, on: { click: this.onSearch } }, '查询'),
        h(C.button, { props: { type: 'warning', size: 'mini' }, on: { click: this.onReset } }, '重置')
      ])
    }
  },
  render(h) {
    const _this = this
    const { default: defaultSlot, ...scopedSlots } = this.$scopedSlots
    const data = {
      ref: 'form',
      props: {
        ...this._props,
        size: 'mini'
      },
      class: 't-query',
      scopedSlots: {
        default() {
          if (defaultSlot) return [].concat(defaultSlot(_this.model$), _this.renderOperation(h))
          else return _this.renderOperation(h)
        },
        ...scopedSlots
      }
    }

    data.props.model = this.model$
    if (!data.props.rules) data.props.rules = {}
    return h(TForm, data)
  },
  created() {
    // 保存queryModel初始值, 在不使用formItem时 进行重置
    this.initParamsString = this.crud && this.crud.queryModel ? JSON.stringify(this.crud.queryModel) : ''
  }
}
