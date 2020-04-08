<template>
  <div class="login">
    <el-form :label-position="labelPosition" label-width="80px" :model="formData" class="content">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <!-- 添加键盘回车登陆功能 -->
        <el-input @keyup.enter='login' type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import axios from "axios";
// import MyAxios from '@/plugins/MyAxios'
export default {
  data() {
    return {
      labelPosition: "top",
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
   var response = await this.$http.post('login',this.formData);
  //     var response1 = await axios.get('http://localhost:8888/api/private/v1/users?pagenum=1&pagesize=10');
  //  console.log(response1)
      let {
            data: {
              meta: { msg, status }
            }
          } = response;
          //  console.log(msg,status,token)

          if (status == 200) {
            //  console.log('hahah')
            this.$message({
              showClose: true,
              message: msg,
              type: "success"
            });
            let {
              data: {
                data: { token }
              }
            } = response;
            sessionStorage.setItem("token", token);
            // 使用this.$router.push()方法跳转到首页
            this.$router.push('/');
          } else {
            console.log("qwww");
            this.$message.error(msg);
          }
       
    }
  }
};
</script>
<style scoped>
.login {
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.login .content {
  background-color: #fff;
  width: 400px;

  padding: 30px;
  border-radius: 5px;
}
.login .content .btn {
  width: 100%;
}
</style>