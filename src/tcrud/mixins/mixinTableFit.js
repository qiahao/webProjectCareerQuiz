
export default {
  computed: {},
  data() {
    return {
      isFitHeight: true,
      updateHeightTimer: null,
      maxHeight: 300,
      minHeight: 200
    }
  },
  methods: {
    calcMaxHeight() {
      const windowHeight = window.innerHeight
      const padding = 85 + 30 // 扣掉顶部高度 和 底部padding
      const parentNode = this.$el.parentNode
      if (!parentNode) return
      const parentNodeChildNodes = parentNode.childNodes
      let siblingHeight = 0
      parentNodeChildNodes.forEach(el => {
        const { position } = el.style
        if (el && (!position || position === 'static') && el.offsetHeight > 0 && el !== this.$el) {
          siblingHeight += el.offsetHeight
        }
      })

      let h = windowHeight - siblingHeight - padding
      if (h < this.minHeight) {
        h = this.minHeight
      }

      return h
    },
    updateHeight() {
      if (this.updateHeightTimer) {
        this.updateHeightTimer = null
        clearTimeout(this.updateHeightTimer)
      }
      this.updateHeightTimer = setTimeout(() => {
        this.$nextTick(() => {
          this.maxHeight = this.calcMaxHeight()
          this.updateHeightTimer = null
        })
      }, 100)
    }
  },
  created() {
    if (this.vc.fitHeight === false || this.fitHeight === false) {
      this.isFitHeight = false
      this.maxHeight = ''
    }
  },
  mounted() {
    if (this.isFitHeight) {
      this.$nextTick(() => {
        window.addEventListener('resize', this.updateHeight)
        this.updateHeight()
      })
    }
  },
  beforeDestroy() {
    if (this.isFitHeight) {
      window.removeEventListener('resize', this.updateHeight)
      clearTimeout(this.updateHeightTimer)
    }
  }
}
