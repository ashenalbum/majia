import axios from "axios";
import store from "../store/index";
import {Toast} from "vant";

// 上传文件
export const upFile = (formData) => {
    return axios({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        url: window.baseUrl + "/public/index.php/activity/Apiactivity/upload",
        data: formData,
        params: {...store.state.token}
    })
}

// 创建axios实例
const service = axios.create({
    baseURL: window.baseUrl + "/public/index.php", // api的base_url
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
        if(data.err!==0 && data.content){
            Toast(data.content);
        }
        return data;
    },
    error => {
        Toast("error");
        return Promise.reject(error);
    }
);

export default service;


