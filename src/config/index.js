const env = process.env.NODE_ENV
// 开发环境 npm run dev
const development = {
  host: `http://139.224.116.255:5001/admin/v1`,
  uploadUrl: `http://139.224.116.255:5001/admin/v1/upload`
}

// 正式环境打包 npm run build
const production = {
  host: `http://139.224.116.255:5001/admin/v1`,
  uploadUrl: `http://139.224.116.255:5001/admin/v1/upload`
}

const CONFIG = {
  development,
  production
}
export default CONFIG[env]
