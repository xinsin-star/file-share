import {ElMessage, ElNotification} from "element-plus"
import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_BASE_API,
    // 超时
    timeout: 1000000
})

// request拦截器
service.interceptors.request.use(config => {

    return config
}, error => {
    console.error(error)
    return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(res => {
    const code = res.data.status

    if (code === 500) {
        ElMessage({ message: msg, type: 'error' })
        return Promise.reject(new Error(msg))
    } else if (code !== 200) {
        ElNotification.error({title: msg})
        return Promise.reject('error')
    } else {
        return Promise.resolve(res.data)
    }
},error => {
    console.error(error)
    ElMessage({ message: error.msg, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
})

export default service