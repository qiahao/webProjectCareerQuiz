<template>
  <div class="page-wrapper">
    <slot></slot>
    <el-pagination @current-change="handlerCurrentChange" :current-page="option.currentPage" :page-size="option.pageSize" :page-sizes="option.pageSizes" :total="option.total" :layout="option.pageLayout" class="mt15">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    option: {
      type: Object,
      require: true
    }
  },
  methods: {
    handlerCurrentChange(p) {
      this.$emit('current-change', p)
    }
  },
  create() {}
}
</script>

<style>
</style>
