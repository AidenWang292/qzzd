<template>
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row>
  <el-col :span="24" class="marg-top">
       <el-input clearable placeholder="请输入内容" v-model="inputVal" class="input1">
        <el-button @click="inputSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain  @click="adddialogFormVisible = true">添加</el-button>
  </el-col>
</el-row>
           <el-table
           strip
           border
      :data="data"
      style="width: 100%">
       <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width='180'>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="时间"
        width='180'>
        <template slot-scope='scope'>
          {{scope.row.create_time|formatDate('YYYY-MM-DD')}}
        </template>
      </el-table-column>

      <el-table-column
        prop="mg_state"
        label="用户状态"
        width="80">
        <template slot-scope='scope'>
          <el-switch
           @change="switchChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
</el-switch>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="">
        <template slot-scope='scope'>
          <el-row>
            <!-- 获取本行数据 -->
            <!-- {{scope.row}} -->
          
            <el-button @click="openEditUser(scope.row)" type="primary" icon="el-icon-edit"  size='mini'></el-button>
            <el-button @click= "userDelete(scope.row.id)" type="danger" icon="el-icon-delete" size='mini' plain></el-button>
            <el-button @click="asignRoles(scope.row)" type="success" icon="el-icon-check" size='mini'></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2,4,6,9,20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 关闭和取消 -->
    <el-dialog title="添加用户" :visible.sync="adddialogFormVisible">
  <el-form :rules="rules"
  :model="form"
  label-width="80px"
  ref="addValidate"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
   <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <!-- <el-button @click="adddialogFormVisible=false">取 消</el-button> -->
     <el-button @click="cancelAddUser">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </div>
</el-dialog>
<!-- 点击跳出编辑用户界面 -->
 <el-dialog @close='editUserClose'  title="修改用户" :visible.sync="editdialogFormVisible">
  <el-form 
  :model="form"
  label-width="80px"
  ref="editValidate"
  >
    <el-form-item label="用户名" prop="username">
      <!-- readonly -->
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <!-- <el-button @click="adddialogFormVisible=false">取 消</el-button> -->
     <el-button @click="cancelEditUser">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </div>
</el-dialog>
<!-- 3分配用户权限dialog -->
<el-dialog title="分配角色" :visible.sync="asignRolesdialogFormVisible">
  <el-form :model="form" label-width="80px">
    <el-form-item label="当前用户" prop="username">
         {{form.username}}
    </el-form-item>
    <el-form-item label="选择角色">
      <el-select v-model="rolesId" > 
        <el-option label="请选择" :value="-1" disabled></el-option>
        <!-- v-model的值为当前被选中的el-option的 value 属性值 -->
        <!-- :label 显示的值 -->
        <el-option v-for="item in roleNames" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelAsignRoles">取 消</el-button>
    <el-button type="primary" @click="confirmAsignRoles">确 定</el-button>
  </div>
</el-dialog>
    </el-card>
</template>
<script>
// import axios from 'axios'
export default {
   created(){
 
   this.loadData();

    },
    methods:{
       async loadData(){
        var token = sessionStorage.getItem('token');
        // axios全局配置携带token发送请求。
        this.$http.defaults.headers.common['Authorization'] = token;
         var response = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.inputVal}`)
        //  console.log(response);
        let{data:{data:{users,total},meta:{msg,status}}} = response;
        this.total=total;
        // console.log(users);
        if(status===200){
            this.$message.success(msg)
            this.data = users;
        }else{
            this.$message.error(msg);
        }
       
        },
        handleCurrentChange(val){

          this.pagenum = val;
          this.loadData();

        },
        handleSizeChange(val){
          this.pagesize=val;
          this.loadData();
        },
        inputSearch(){
          this.loadData();
        },
        // 添加用户,并且正则判断
       async addUser(){
         this.$refs.addValidate.validate(async(valid)=>{
           if(valid){
             
              var response = await this.$http.post('/users',this.form);
          let {
            data:{
              meta:{
                msg,status
              }
            }
          } = response;
          console.log(msg,status)
           if(status===201){
            this.$message.success(msg);
            this.loadData(),
            this.adddialogFormVisible=false
          }else{
            this.$message.error(msg)
          };
          // 清空表单this.$refs[formName].resetFields(); 
          this.$refs.addValidate.resetFields();
           }else{
             this.$message.warning('表单验证失败');
           }
         })
        //  console.log('hhahah')
         
         
        },
        // 取消添加用户
        cancelAddUser(){
          this.adddialogFormVisible=false;
          this.$refs.addValidate.resetFields();
        },
        changeUserInfo(user){
          this.form.username = user.username;
          this.form.email = user.email;
          this.form.mobile= user.mobile;
        },
        openEditUser(users){
          this.form.username= users.username;
          this.form.email= users.email;
          this.form.mobile=users.mobile;
          this.editdialogFormVisible=true;
          // 存储用户id
          this.form.id=users.id
        },
        async editUser(){
          let response = await this.$http.put(`users/${this.form.id}`,{
            email:this.form.email,
            mobile:this.form.mobile
          });
          console.log(response);
          const {
            data:{username},
            meta:{msg,status}
          }=response.data;
          if(status===200){
            this.$message.success(msg);
            this.loadData();
            this.editdialogFormVisible=false;
            // this.form={}
            for(let key in this.form){
              // 此处不能写this.form.key='';是增加属性
              // 把值清空注意key无引号
              this.form[key]='';
              // console.log('1234')
            }
           
            
          }else{
            this.$message.warning(msg)
          }
        },
        cancelEditUser(){
            this.editdialogFormVisible=false;
          // this.$refs.addValidate.resetFields();

        },
        // 编辑用户名字关闭
        editUserClose(){
            for(let key in this.form){
              // 此处不能写this.form.key='';是增加属性
              // 把值清空注意key无引号
              this.form[key]='';
              // console.log('1234')
            }
           
        },
        // 用户删除弹出确认
        userDelete(id){
            this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
           const response = await this.$http.delete(`users/${id}`);
          //  console.log(response); 
           const{meta:{status,msg}}= response.data;
           if(status===200){
            //  this.data.length为当前页的数据

             if(this.data.length===1&&this.pagenum!==1){
               this.pagenum--;
             
             }
            //  注意this.loadData的位置
               this.loadData()
           }else{
             this.$message.error(msg)
           }
          // this.$message({
          //   
          //   const response
          //    type: 'success',
          //    message: '删除成功!'
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
       async switchChange(users){
          const response = await this.$http.put(`users/${users.id}/state/${users.mg_state}`);
          // console.log(response);
          const {meta:{msg,status}} = response.data;
         
          if(status===200){
             this.$message.success(msg);
          }else{
            this.$message.error(msg)
          }
        },
        async asignRoles(users){
          this.asignRolesdialogFormVisible=true;
          this.form.username=users.username;
          const response = await this.$http.get('roles');
          // console.log(response);
          // 获取用户名
          const roleNames=response.data.data
          // 获取用户id 
         this.currentUserId = users.id
        //  console.log(this.currentUserId)
          // console.log(roleNames)
          // roleNames是一个数组形式，注意roleNames:[]
          this.roleNames = roleNames;
          // 根据id查询用户信息，返回角色id 发请求拿数据
          const response1 =await this.$http.get(`users/${users.id}`)
          this.rolesId = response1.data.data.rid;
          // console.log(response1)
          
        },
      //  确认分配角色
         async confirmAsignRoles(){
          const response = await this.$http.put(`users/${this.currentUserId}/role`,{rid:this.rolesId});
          // console.log(response);
          const {meta:{msg,status}} = response.data;
          if(status===200){
            this.$message.success(msg);
             this.asignRolesdialogFormVisible = false;
          }else{
            this.$message.error(msg)
          }

        },
        // 取消分配角色
         cancelAsignRoles(){},
        

    }, 
     data() {
      return {
        // 当前页数据
        data: [],
        // 第几页
        pagenum:1,
        // 每页码几条
        pagesize:2,
        // start:0,
        // end:this.data.length-1,
        // currentpagestartindex:pagenum*pagesize-2,
        // curentpageendindex:end-currentpagestartindex,
        cpage:1,
        total:0,
        inputVal:'',
        adddialogFormVisible:false,
        editdialogFormVisible:false,
        asignRolesdialogFormVisible:false,
        form:{
          username:'',
          password:'',
          email:'',
          mobile:''

        },
        roleNames:[],
        currentUserId:'',
        rolesId:-1,
        rules:{
            username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           mobile: [
            { required: true, message: '请输入电话', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }


        
      }
    }
}
</script>
<style scoped>
.box-card{
    height: 100%;
}
.marg-top{
    margin-top:20px;
    margin-bottom:20px;
}
.input1{
    width:400px;
}

</style>