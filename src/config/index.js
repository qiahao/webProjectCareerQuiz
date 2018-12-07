const env = process.env.NODE_ENV
// 开发环境 npm run dev
const development = {}

// 正式环境打包 npm run build
const production = {}

const CONFIG = {
  development,
  production
}
export default CONFIG[env]
