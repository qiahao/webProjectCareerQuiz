import { C } from '../buildinFields'
import { getPropsAndEvents } from '../../utils'

const DefaultPaginationProps = {
  layout: 'prev, pager, next, jumper, ->, total',
  pageSizes: [10, 20, 30, 40, 50, 100]
}

const PAGINATION_PROPS = Object.keys(C.pagination.props)
const PAGINATION_EVENTS = ['size-change', 'current-change', 'prev-click', 'next-click']
export default function renderPagination(vm, conf) {
  const h = vm.$createElement
  const data$ = getPropsAndEvents({ ...DefaultPaginationProps, ...conf }, PAGINATION_PROPS, PAGINATION_EVENTS)
  data$.style = 'margin-top: 10px;'
  return h(C.pagination, data$)
}
