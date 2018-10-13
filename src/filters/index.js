import Vue from 'vue'
import { fmt } from '@utils'
import moment from 'moment'
Vue.filter('dateFormat', (v, f) => {
  return fmt.date(v, f)
})
Vue.filter('momentFormat', (v, f) => {
  return moment(v).format(f)
})

export default {}
