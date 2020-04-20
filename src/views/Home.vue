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
        <el-menu 
        default-active="/users" 
        unique-opened router
        >
          <el-submenu index="1"
          v-for="item in menus"
          :key ="item.id"
        

          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item 
            v-for="item1 in item.children"
            :key="item1.id"
            :index="'/' + item1.path"
            >
              <i class="el-icon-location"></i>
              {{item1.authName}}
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
    // 动态生成左侧菜单
    this.loadMenus();
  },
//  需要判断是否登陆
  // beforeCreate() {
  //   var token = sessionStorage.getItem("token");
  //   if (!token) {
  //     this.$message.warning;
  //     this.$router.push("/login");
  //   }
  // },
  methods: {
    logOut() {
      // 退出登录
      this.$message.success("退出成功");
      sessionStorage.clear();
      this.$router.push("/login");
    },
     async loadMenus(){
       
    const response = await this.$http.get('menus');
    console.log(response)
    this.menus = response.data.data
  },
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
