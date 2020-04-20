<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <wf-breadcrumb nav1="权限管理" nav2="角色列表"></wf-breadcrumb>
    <!-- 按钮 -->
    <el-row class="addBtn">
      <el-col :span="24">
        <el-button>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="data" style="width: 100%" border strip>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row v-for="level1 in props.row.children" :key="level1.id">
            <el-col :span="4">
              <el-tag closable @close="handleClose(props, level1.id)">
                {{ level1.authName }}
              </el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="level2 in level1.children" :key="level2.id">
                <el-col :span="4">
                  <el-tag closable @close="handleClose(props, level2.id)">
                    {{ level2.authName }}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    @close="handleClose(props, level3.id)"
                    v-for="level3 in level2.children"
                    :key="level3.id"
                  >
                    {{ level3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180">
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-row>
            <!-- 获取本行数据 -->
            <!-- {{scope.row}} -->

            <el-button
              @click="openEditUser(scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <!-- {{scope.row}} -->
            <el-button
              @click="userDelete(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              plain
            ></el-button>
            <el-button
              @click="openRoles(scope.row)"
              type="success"
              icon="el-icon-check"
              size="mini"
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 权限tree -->
    <el-dialog title="分配权限" :visible.sync="roleTreeDialogVisible">
      <el-tree
        :props="defaultProps"
        :data="treeData"
        node-key="id"
        :default-checked-keys="treeList"
        default-expand-all
        show-checkbox
        ref="tree"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAssignRolesRights"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      loading: true,
      roleTreeDialogVisible: false,
      treeData: [],
      treeList: [],
      currentRoleId:-1,
      defaultProps: {
        label: "authName",
        children: "children"
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get("roles");
      this.loading = false;
      // console.log(response);
      const {
        meta: { msg, status },
        data
      } = response.data;
      if (status === 200) {
        this.$message.success(msg);
        this.data = data;
      } else {
        this.$message.error(msg);
      }
    },
    async handleClose(roleId, rightId) {
      const response = await this.$http.delete(
        `roles/${roleId.row.id}/rights/${rightId}`
      );
      // console.log(response);
      const {
        meta: { status, msg }
      } = response.data;
      if (status === 200) {
        this.$message.success(msg);
        roleId.row.children = response.data.data;
      } else {
        this.$message.error(msg);
      }
    },
    async openRoles(roleList) {
      this.roleTreeDialogVisible = true;
      this.currentRoleId = roleList.id;
      // 请求树形数据
      const response = await this.$http.get("rights/tree");
      // console.log(response)
      // 遍历之前清空treeList
      this.treeList = [];
      this.treeData = response.data.data;
      roleList.children.forEach(level1 => {
        level1.children.forEach(level2 => {
          level2.children.forEach(level3 => {
            this.treeList.push(level3.id);
          });
        });
      });
    },
    async confirmAssignRolesRights() {
      this.roleTreeDialogVisible = false;
      // 获取权限id列表
      const arr1 = this.$refs.tree.getCheckedKeys();
      const arr2 = this.$refs.tree.getHalfCheckedKeys();
      const arr =[...arr1,...arr2];
      const response = await this.$http.post(`roles/${this.currentRoleId}/rights`,{
        rids:arr.join(',')
      })
     console.log(response)
     const {meta:{status,msg}}=response.data;
     if(status===200){
       this.$message.success(msg)
       this.loadData()
     }else{
       this.$message.error(msg)
     }

    }
  }
};
</script>
<style scoped>
.box-card {
  height: 100%;
}
.addBtn {
  margin-top: 15px;
  margin-bottom: 10px;
}
</style>
