import { C } from '../buildinFields'
import render from './render'
import crudChild from '../../mixins/crudChild'

export default {
  name: 'TForm',
  props: {
    fields: { type: Array, default: () => [] },
    span: { type: Number, default: 12 }, // 布局
    ...C.form.props
  },
  mixins: [crudChild],
  render(h) {
    const conf = {
      ref: 'form',
      ...this._props
    }
    return render(this, conf, this.model)
  }
}
