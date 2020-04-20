import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import temp from "@/views/temp";
import Home from "@/views/Home";
import Users from "@/views/users/users";
import Rights from "@/views/rights/rights";
import Roles from "@/views/rights/roles";

// 路由组件
Vue.use(Router);

export default new Router({
  // 配置路由规则
  // 嵌套路由加children属性
  routes: [
    { name: "Login", path: "/login", component: Login },
    { name: "temp", path: "/temp", component: temp },
    {
      name: "Home",
      path: "/",
      component: Home,
      children: [
        { name: "users", path: "/users", component: Users },
        {name:"rights",path:"/rights",component:Rights},
        {name:"roles",path:"/roles",component:Roles}
      ]
    }
  ]
});
