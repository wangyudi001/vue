
import axios from 'axios'
import router from './router'

// axios 配置
axios.defaults.timeout = 8000
axios.defaults.baseURL = '127.0.0.1:8080'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.token) { // 判断token是否存在
      config.headers.token = localStorage.token // 将token设置成header.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === '401') {
      router.replace('/')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios
