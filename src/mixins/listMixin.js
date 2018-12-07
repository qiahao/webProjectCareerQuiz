import tableMixin from '@/mixins/tableMixin'
import UrmPagination from '@components/UrmPagination'
import qs from 'qs'

export default {
  data() {
    return {}
  },
  mixins: [tableMixin],
  components: { UrmPagination },
  computed: {
    detailQuery() {
      let query = qs.stringify(this.assignQuery(this.query || {}))
      return `?${query}`
    },
    listQuery() {
      return this.$route.query ? qs.parse(this.$route.query) : {}
    }
  },
  created() {
    if (this.query) {
      this.query = Object.assign({}, this.query, this.listQuery)
    }
    if (this.listQuery.pageNum !== undefined && this.listQuery.pageSize !== undefined) {
      this.pageNum = +this.listQuery.pageNum
      this.pageSize = +this.listQuery.pageSize
    }
  }
}
