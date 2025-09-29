import axios from "axios";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const instance = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 超时
    timeout: 1000000
})
const responseInterceptors = (response) => {
    const token = response.headers.token;
    if (token) {
        window.localStorage.setItem("token", 'Bearer-' + token);
    }
    return response;
};
const responseInterceptorsError = (error) => {
    if (error.response && error.response.status === 403) {
        // showMessage.error("没有权限访问该资源，请联系管理员！")
    } else if (error.response && error.response.status === 500) {

    } else {
        // 其他错误处理
        console.error("请求错误:", error.message);
    }
    return Promise.reject(error);
}
instance.interceptors.response.use(responseInterceptors, responseInterceptorsError);
const requestInterceptors = (request) => {
    const token = window.localStorage.getItem("token");
    if (request.headers) {
        request.headers["Access-Token"] = token;
    } else {
        request.headers = {"Access-Token": token};
    }
    return request;
};
instance.interceptors.request.use(requestInterceptors);

export default instance;
