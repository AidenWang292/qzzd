<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"
          ><img width="60px" height="60px" src="@/assets/logo.jpg" alt=""
        /></el-col>
        <el-col :span="19"><div class="s1">电商管理系统</div></el-col>
        <el-col :span="1"
          ><a @click.prevent="logOut" href="" class="tui">退出</a></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="asice" width="200px">
        <!-- 左侧边栏 -->
        <!-- 打开一个，路由在index中设置 -->
        <el-menu default-active="/users" unique-opened router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
              <i class="el-icon-location"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <i class="el-icon-location"></i>
              角色列表
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-location"></i>
              权限列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-location"></i>
              商品列表
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-location"></i>
              分类参数
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-location"></i>
              商品分类
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-location"></i>
              订单列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              数据列表
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main"><router-view /></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data(){
    return {
      menus:[]
    }
  },
  created(){
    this.loadMenus()
  },
  loadMenus(){
    const response = this.$http.get('menus');
  },
  beforeCreate() {
    var token = sessionStorage.getItem("token");
    if (!token) {
      this.$message.warning;
      this.$router.push("/login");
    }
  },
  methods: {
    logOut() {
      // 退出登录
      this.$message.success("退出成功");
      sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
  padding: 0;
}
.header .s1 {
  line-height: 60px;
  text-align: center;
  color: white;
  font-size: 24px;
}
.header .tui {
  line-height: 60px;
  color: rebeccapurple;
  text-decoration: none;
}
.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
