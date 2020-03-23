<template>
  <div class="login">
    <el-form :label-position="labelPosition" label-width="80px" :model="formData" class="content">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
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
   var response = await axios.post('http://localhost:8888/api/private/v1/login',this.formData);
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