<template>
  <div class="picture-upload">
    <el-upload :action="action"
      list-type="picture-card"
      :multiple="false"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :limit="1"
      :file-list="fileList"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      >
      <el-button plain type="primary">上传图片</el-button>
      <span class="fc9 fs12">不超过500K</span>
    </el-upload>
  </div>
</template>
<script>
export default{
  data() {
    return {
      // fileList:[],
      picUrl: ''
    }
  },
  model: {
    prop: 'imageUrl',
    event: 'change'
  },
  props: {
    action: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    fileList: {
      type: Array,
      default: []
    }
  },
  watch: {
    imageUrl(val) {
      this.picUrl = val
    }
  },
  methods: {
    handleSuccess(rsp, file) {
      console.log(file)
      this.picUrl = file.response[0]
      // this.picUrl = URL.createObjectURL(file.raw)
      this.$emit('change', this.picUrl)
      this.$emit('change-file', this.picUrl)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleExceed() {
      this.$message.warning('限制一张图片，请删除后再上传')
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/pjpeg' || 'image/png' || 'image/gif'
      const isLmtSize = file.size / 1024 < 500
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!')
      }
      if (!isLmtSize) {
        this.$message.error('上传头像图片大小不能超过 500KB!')
      }
      return isJPG && isLmtSize
    }
  }
}
</script>

<style lang="scss">
.picture-upload{
  .el-upload-list--picture-card .el-upload-list__item{
    width: 100px;
    height: 50px;
  }
  .el-upload--picture-card{
    width: auto;
    height: auto;
    line-height: inherit;
    border:0;
    background: transparent
  }
}
</style>