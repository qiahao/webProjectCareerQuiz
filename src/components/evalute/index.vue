<template>
<div class="evalute box-flex">
  <img :src="item.headIcon" class="avatar-36" alt="">
  <div class="flex-one ml10">
    <div class="tit box-flex">
      <div class="flex-one name">
        <div class="name fs15">{{item.userName}}</div>
      </div>
      <div class="time fs12 fc9">{{item.createTime}}</div>
    </div>
  <el-rate v-model="item.stars" disabled show-score text-color="#FFD947" score-template="{value}">
  </el-rate>
  <p class="mt10">{{item.text}}</p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {},
  created() {}
}
</script>
<style lang="scss">
.evalute{
  .el-rate__icon{
    font-size:16px;
    margin-right:1px;
  }
}
</style>

<style lang="scss" scoped>
</style>
