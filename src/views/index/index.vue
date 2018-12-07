<template>
  <div>
    <navigation>
      <div class="nav">
        <router-link  v-for="(item, index) in routes" :key="index" :to="item.path">{{item.meta.title}}</router-link>
      </div>
    </navigation>

    <div class="wrapper mtb20">
      <p>请选择对应测评。</p>
      <p>完成后，请保存结果。</p>
    </div>
  </div>
</template>

<script>
import routes from '../../router/routes'

export default {
  data() {
    return { routes: routes.filter(item => item.meta && item.meta.menu) }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {},
  created() {
    console.log('routes', routes)
  }
}
</script>

<style lang="scss">

.menu {
  margin-top: 20px;
}
.menu-item a {
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: blue;
  }
}
</style>
