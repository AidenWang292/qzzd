import axios from 'axios'
import Vue from 'Vue'
const MyAxios={}
MyAxios.install = function(Vue){
    // 配置全局axios,在Vue原型上添加$http
Vue.prototype.$http = axios;
// 配置baseURL
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
// Add a request interceptor
// 拦截器设置，
// 请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log(config)
    if(config.url.toLocaleLowerCase() !=='login'){
      const token=  sessionStorage.getItem('token');
      console.log(token)
        config.headers.Authorization=token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
// 响应拦截器
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
}
// 勿忘导出成员
export default MyAxios