// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/style.css'
import moment from 'moment'
import MyAxios from '@/plugins/MyAxios'
import wfBreadCrumb from '@/components/wf-breadcrumb'
// import axios from 'axios'
Vue.config.productionTip = false
// 注册插件
Vue.use(ElementUI);
Vue.component(wfBreadCrumb.name,wfBreadCrumb)
Vue.use(MyAxios)
// 注册全局过滤器
Vue.filter('formatDate',(ot,ft)=>{
  return moment(ot).format(ft);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
