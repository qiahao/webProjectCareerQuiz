export default {
  data() {
    return {
      permissionKey: '',
      permissions: null
    }
  },
  computed: {
    permission() {
      if (!this.permissionKey || !this.$permissions) return {}
      return this.$permissions[this.permissionKey] || {}
    },
    hasPermissionAdd() {
      // 未设置权限对象
      return this.$checkPermission(this.permission.add)
    },
    hasPermissionDel() {
      // 未设置权限对象
      return this.$checkPermission(this.permission.del)
    },
    hasPermissionEdit() {
      // 未设置权限对象
      return this.$checkPermission(this.permission.edit)
    },
    hasPermissionList() {
      // 未设置权限对象
      return this.$checkPermission(this.permission.list)
    },
    hasPermissionDownload() {
      // 未设置权限对象
      return this.$checkPermission(this.permission.list)
    }
  }
}
