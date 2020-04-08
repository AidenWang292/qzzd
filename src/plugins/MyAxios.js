import axios from 'axios'
import Vue from 'Vue'
const MyAxios={}
MyAxios.install = function(Vue){
    // 配置全局axios,在Vue原型上添加$http
Vue.prototype.$http = axios;
// 配置baseURL
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
}
// 勿忘导出成员
export default MyAxios