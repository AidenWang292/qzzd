import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import temp from "@/views/temp";
import Home from "@/views/Home";
import Users from "@/views/users/users";
import Rights from "@/views/rights/rights";
import Roles from "@/views/rights/roles";
// 单独按需引入Message
import {Message} from 'element-ui'
// 路由组件
Vue.use(Router);

const router = new Router({
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
        { name: "rights", path: "/rights", component: Rights },
        { name: "roles", path: "/roles", component: Roles }
      ]
    }
  ]
});
// 前置路由守卫
// 看路由跳转是否有权限
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 注意toLocalLowerCase()后面的括号
  if (to.name && to.name.toLocaleLowerCase() !== "login") {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
      Message.warning('请您先登录')
      return;
    }
  }
  next();
});

export default router;
