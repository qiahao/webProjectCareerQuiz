<template>
  <div class="head">
    <div class="wrapper">
      <img :src="logo" alt="" class="logo">
      <h1>东西电商</h1>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import logo from '../../assets/images/logo.png'
export default {
  data() {
    return { logo: logo }
  },
  methods: {},
  created() {}
}
</script>


<style lang="scss">
.head {
  border-bottom: 5px solid #eee;
  .wrapper{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .logo {
    width: 60px;
    height: 54px;
    margin-right: 30px;
    vertical-align: middle;
  }
  h1 {
    display: inline-block;
    vertical-align: middle;
  }
}
.nav{
  margin-top: 20px;
  float: right;
  a{
    margin-left: 20px;
    &:hover{
      text-decoration: underline;
    }
  }
}
</style>
