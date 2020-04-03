import axios from "axios";
import store from "../store/index";

// 上传文件
export const upFile = (url,formData) => {
    let config = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: e => {
            var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
            this.progress = completeProgress;
        }
    };
    return axios.post(url,formData,config);
}

// 创建axios实例
const service = axios.create({
    baseURL: "http://sqyx.78wa.com/", // api的base_url
    timeout: 500000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    (config) => {
        config.params = {
            ...store.state.token,
            ...config.params
        }
        return config;
    },
    error => {
        // Do something with request error
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        const data = response.data;
        return data;
    },
    error => {
        console.log(error.message);
        return Promise.reject(error);
    }
);

export default service;


