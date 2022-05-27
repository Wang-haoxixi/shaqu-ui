import axios from 'axios'
import {getToken} from "./auth";
import { transToFormdata } from './tools'
axios.defaults.withCredentials = true;
import router from '../router';
import {removeToken} from "@/utils/auth";
// 创建 service 实例，而不是使用默认的 axios 实例，主要是为了防止在系统内部别的地方 axios 实例被修改
const service = axios.create({
    timeout: 20000,     // 请求超时时间
    baseURL: process.env.VUE_APP_BASE_URL
});

// 异常拦截器
const errorHandler = (error) => {
    const status = error.response.status;
    switch (status) {
        case 400:
            error.message = error.response.data.message;
            break;
        case 401:
            error.message = '未授权，请登录';
            removeToken();
            router.replace({path: '/user/login'});
            break;
        case 403:
            error.message = '没有权限，拒绝访问';
            break;
        case 404:
            error.message = `请求地址出错: ${process.env.VUE_APP_BASE_URL}${error.response.config.url}`;
            break;
        case 408:
            error.message = '请求超时';
            break;
        case 500:
            error.message = '服务器内部错误';
            break;
        case 501:
            error.message = '服务未实现';
            break;
        case 502:
            error.message = '网关错误';
            break;
        case 503:
            error.message = '服务不可用';
            break;
        case 504:
            error.message = '网关超时';
            break;
        case 505:
            error.message = 'HTTP版本不受支持';
            break;
        default:
            error.message = '未知错误';
            break;
    }

    return Promise.reject({code: status, msg: error.message});
}


// request 拦截器
service.interceptors.request.use(config => {
    if (getToken()) {
        config.headers.Authorization = `Bearer ${getToken()}`;
    }
    config.headers['Content-Type'] = 'application/json'
    if(config.type && config.type === 'postFormData'){
        config.data = transToFormdata(config.data)
        config.headers['Content-Type']='application/x-www-form-urlencoded; charset=utf-8';
        // config.headers.Origin = null;
    }else if(config.type && config.type === 'postConditionData'){
        config.headers['Condition']=config.params.condition;
        delete config.params['condition'];
    }else if(config.type && config.type === 'postConditionFormData'){
        config.headers['Condition']=config.data.condition;
        delete config.data['condition'];
        config.data = transToFormdata(config.data)
        config.headers['Content-Type']='application/x-www-form-urlencoded; charset=utf-8';
    }
    return config;
}, errorHandler);

service.interceptors.response.use(response => {
    const dataAxios = response.data
    if (response.status === 200 ) {
       return dataAxios;
    }
    else {
        return Promise.reject({code: response.status, msg: response.statusText, detail:response.config})
    }
}, errorHandler);

// // request 拦截器
// service.interceptors.request.use(
//     config => {
//         if (getToken()) {
//             config.headers['Authorization'] = `Bearer ${getToken()}`;
//         }
//         config.headers['Content-Type'] = 'application/json';
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// )
//
// // response 拦截器
// service.interceptors.response.use(
//     response => {
//         console.log(`response from '${response.config.url}'`);
//         console.log(response);
//         // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
//         // 否则的话抛出错误
//         if (response.status === 200) {
//             if (response.data.code !== 200) {
//                 Notification.error(response.data.msg);
//                 return;
//             } else {
//                 return response.data;
//             }
//         } else {
//             return Promise.reject(response);
//         }
//     },
//     error => {
//         // console.log('error:');
//         // console.log(error);
//         // console.log(error.response)
//         let status = 0;
//         try {
//             status = error.response.status;
//         } catch (e) {
//             if (error.toString().indexOf('Error: timeout') > -1) {
//                 Notification.error('网络请求超时');
//                 return Promise.reject(error);
//             }
//         }
//         // 服务器状态码不是2开头的的情况
//         // 这里可以跟后台开发人员协商好统一的错误状态码
//         // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
//         if (status) {
//             switch (status) {
//                 case 401:
//                     this.$router.replace({path: '/user/login'});
//                     break;
//                 case 403:
//                     Notification.error(error.response.data);
//                     break;
//                 case 404:
//                     Notification.error('接口请求不存在');
//                     break;
//                 case 502:
//                     Notification.error('接口请求失败，服务器网关错误');
//                     break;
//                 default:
//                     Notification.error('接口请求发生异常，' + error.response.data.message);
//             }
//         }
//         // return Promise.reject(error);
//     }
// );

export default service;

