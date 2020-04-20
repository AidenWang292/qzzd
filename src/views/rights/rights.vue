<template>
  <!-- 面包屑 -->
  <el-card class="card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table strip border :data="arr" style="width: 100%; margin-top:15px">
      <el-table-column type="index" label="#" width="50"> </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="180"> </el-table-column>
      <el-table-column prop="level" label="层级">
        <!-- <template>
            <span v-for='item in arr' :key ="item.index">  {{item}}<span>
           
        </template> -->
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      arr: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
    //   var token = sessionStorage.getItem("token");
    //   //   console.log(token)
    //   this.$http.defaults.headers.common["Authorization"] = token;
      const response = await this.$http.get(
        `http://localhost:8888/api/private/v1/rights/list`
      );
      //   console.log(response);
      const {
        meta: { msg, status }
      } = response.data;
      if (status === 200) {
        this.$message.success(msg);
        this.data = response.data.data;
        const level = new Map([
          ["0", "一級"],
          ["1", "二級"],
          ["2", "三級"]
        ]);
        let weblevel = (val, item) => {
          item["level"] = level.get(val);
          this.arr.push(item);
        };
        this.data.forEach(item => {
          weblevel(item.level, item);
        });

        //  return arr
        //    return weblevel(item.level)
      } else {
        this.$message.error(msg);
      }
    }
    // getLevel(){
    //     return
    // }
  }
};
</script>
<style scoped>
.card {
  height: 100%;
}
</style>
