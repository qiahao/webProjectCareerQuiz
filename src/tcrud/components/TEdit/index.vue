<template>
  <el-dialog :close-on-click-modal="closeOnClickModal" :title="title$" :visible.sync="visible$" :width="width" append-to-body>
    <el-form :label-width="labelWidth" :model="model$" :rules="rules" ref="form" style="padding-right: 20px">
      <slot :model="model$" />
    </el-form>
    <slot name="footer">
      <div class="dialog-footer" slot="footer">
        <el-button @click="onCancel" type="default">取消</el-button>
        <el-button :loading="loading$" @click="onOk" type="primary">确认</el-button>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import crudChild from '../../mixins/crudChild'
export default {
  name: 'TEdit',
  mixins: [crudChild],
  props: {
    model: { type: Object, default: null },
    rules: { type: Object, default: () => ({}) },
    title: { type: String, default: '' },
    width: { type: String, default: '520px' },
    labelWidth: { type: String, default: '100px' },
    visible: { type: Boolean, default: false },
    closeOnClickModal: { type: Boolean, default: false },
    ok: { type: Function, default: null }
  },
  data() {
    return {
      loading: false
    }
  },
  components: {},
  filters: {},
  computed: {
    loading$: {
      get() {
        return this.isInCrud ? this.crud.editLoading : this.loading
      },
      set(val) {
        if (this.isInCrud) this.crud.editLoading = val
        else this.loading = val
      }
    },
    visible$: {
      get() {
        return this.isInCrud ? this.crud.editVisible : this.visible
      },
      set(val) {
        if (this.isInCrud) this.crud.editVisible = val
        else this.visible = val
      }
    },
    title$() {
      return this.isInCrud ? this.title || this.crud.editTitle : this.title
    },
    model$() {
      return this.isInCrud ? this.model || this.crud.formModel : this.model
    }
  },
  watch: {
    visible$(n) {
      if (n) {
        this.$nextTick(() => {
          if (this.$refs.form) this.$refs.form.clearValidate()
        })
      } else {
        if (this.$refs.form) this.$refs.form.clearValidate()
      }
    }
  },
  methods: {
    onCancel() {
      this.visible$ = false
      this.loading$ = false
      this.$emit('cancel')
    },
    onOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isInCrud && !this.$listeners.ok) this.crud.onSubmitForm()
          else this.$emit('ok', this.model$)
        }
      })
    },
    // 重置编辑表单, 考虑移出crud, 开发单独的编辑弹框
    resetEditForm() {
      this.$refs.form.resetFields()
      this.$nextTick(this.$refs.form.clearValidate)
    }
  }
}
</script>
