import {ElMessage, ElNotification} from "element-plus"
import axios from 'axios'
import userStore from "@/pinia/modules/user.ts";

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
    if (userStore().token) {
        config.headers['Authorization'] = userStore().token
    }
    return config
}, error => {
    console.error(error)
    return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(res => {
    const code = res.data.status
    const msg = res.data.msg

    if (code === 500) {
        ElMessage({ message: msg, type: 'error' })
        return Promise.reject(new Error(msg))
    } else if (code !== 200) {
        ElNotification.error({title: msg})
        return Promise.reject('error')
    } else {
        if (res.headers['add-authorization']) {
            userStore().token = res.headers['add-authorization']
        }
        return Promise.resolve(res.data)
    }
},error => {
    console.error(error)
    ElMessage({ message: error.data.msg, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
})

export default service