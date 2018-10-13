<template>
    <el-upload class="avatar-uploader avatar-pic" :action="uploadImgUrl" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
        <div class="avatar-inner">
            <img :src="value" class="avatar" v-if="value">
            <div class="avatar-icon avatar" v-else>
            <i class="el-icon-picture avatar-uploader-icon"></i>
            </div>
            <div class="edit-mask" v-if="value">
                <i class="el-icon-plus"></i>
            </div>
        </div>
        <slot name="tips"></slot>
    </el-upload>
</template>
<script>
// import Request from '@/common/request/rest.service'
import config from '@/config'
export default{
  data() {
    return {
      uploadImgUrl: config.uploadUrl
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleSuccess(res, file) {
      this.$emit('input', res[0])
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isLt2M
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .avatar-inner {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 150px;
    height: 150px;
  }
  .avatar-uploader .avatar-inner:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .edit-mask{
    opacity:0;
    position:absolute;top:0;
    left:0;
    right:0;
    bottom:0;
    text-align:center;
    line-height:150px;
    background:rgba(0,0,0,.5);
      border-radius:6px;
      transition:opacity 0.3s
  }
  .el-upload{
    position:relative;
  }
  .el-upload:hover{
    .edit-mask{
      opacity:1;
      font-size:30px;
      color:#fff;     
    }
  }
</style>