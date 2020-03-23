import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import temp from '@/views/temp'

// 路由组件
Vue.use(Router)

export default new Router({
  // 配置路由规则
  routes: [
    {name:'Login',path:'/login',component:Login},
    {name:'temp',path:'/temp',component:temp},
    
  ]
})
