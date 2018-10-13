import axios from 'axios'
import VueCookie from 'vue-cookie'
axios.interceptors.request.use(function(config) {
  Object.assign(config.headers, {
    session_id: decodeURIComponent(VueCookie.get('Session-ID') || '1111')
  })
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})

export default axios
