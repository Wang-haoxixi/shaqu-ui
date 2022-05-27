<template>
    <el-card  class="main-container">
        <div slot="header" class="clearfix">
        <p class="top-titles">角色管理</p>
            <!-- root账号权限-->
            <el-button style="float: right;" type="primary"  @click="showAddRole=true">创建角色</el-button>
        </div>
        <div>
            <el-table :data="roleList">
                <el-table-column prop="orderId" label="序号"></el-table-column>
                <el-table-column prop="name" label="角色名称"></el-table-column>
                <!--            <el-table-column prop="roleCode" label="角色标识"></el-table-column>-->
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown @command="actRole">
                            <el-button type="primary">
                                操作 <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
<!--                                <el-dropdown-item :command="{name:'edit', role:scope.row}">修改</el-dropdown-item>-->
                                <el-dropdown-item :command="{name:'assignPermission', role:scope.row}">分配权限
                                </el-dropdown-item>
                                <el-dropdown-item :command="{name:'delete', role:scope.row}">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-wrapper">
                <el-pagination
                        layout="total,prev,pager,next,jumper"
                        :current-page.sync="pageInfo.curPage"
                        @current-change="handleCurrentChange"
                        :total="pageInfo.total"
                         class="pagination"
                ></el-pagination>
            </div>
            <el-dialog  :visible="showDialog" title="分配权限" :close-on-click-modal="false"
                        @close="showDialog=false">
                <el-tree show-checkbox ref="tree" :default-checked-keys="defaultCheckedKeys" :props="{label:'name'}"
                         node-key="uuid" :data="permissionList" ></el-tree>
                <template slot="footer">
                    <el-button @click="showDialog=false">取消</el-button>
                    <el-button type="primary" @click="savePermissions">确定</el-button>
                </template>
            </el-dialog>
            <el-dialog  :visible="showAddRole" title="创建角色" :close-on-click-modal="false"
                        :show-close = false>
                <el-form :model="addRoleForm" :rules="rules" ref="ruleForm"  label-width="80px">
                    <el-form-item label="角色名称"   prop="name">
                        <el-input v-model="addRoleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述"  prop="description">
                        <el-input v-model="addRoleForm.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitRole">立即创建</el-button>
                        <el-button @click="closeRoleForm">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                showDialog: false,
                roleList: [],
                role: undefined,
                permissionList: [],
                defaultCheckedKeys: [],
                showAddRole: false,//创建角色模态框
                addRoleForm: {
                    name: '',
                    description:''
                },
                rules: {
                    name: [
                        {required: true,
                        pattern: /^\S+$/,
                        trigger: "blur",
                        message: "角色名不能为空！",}
                    ],
                },
                pageInfo:{
                    curPage: 1,
                    size: 10,
                    total: 0,
                },
            }
        },
        created: function () {
            this.loadData();
        },
        methods: {
            handleCurrentChange(val) {
                this.pageInfo.curPage = val;
                this.loadData();
            },
            onSubmitRole(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                       this.addRole();
                    }
                });
            },
            addRole(){
                let self = this;
                let flag=false;

                self.roleList.map(ele=>{
                    if(ele.name===this.addRoleForm.name){
                         return flag=true;
                    }
                });
                if(flag){
                    this.$message.error('角色名重复！');
                    return
                }
                self.$api.systemApi.addRole(this.addRoleForm)
                .then(() => {
                    self.$message({
                        message: '角色创建成功',
                        type: 'success'
                    });
                    this.showAddRole = false;
                    this.loadData()
                })
            },
            closeRoleForm() {
                this.$refs['ruleForm'].resetFields();
                this.showAddRole = false
            },
            loadData: function () {
                let self = this;
                self.$api.systemApi.listRole({
                    page: self.pageInfo.curPage - 1,
                    size: self.pageInfo.size,
                })
                    .then(resp => {
                        let{number,size}=resp
                        self.roleList = resp.content;
                        self.roleList.map((ele,index)=>{
                            ele.orderId=number*size+index+1;
                        })
                        self.pageInfo.total = resp.totalElements;
                    })
                    .catch(err => self.$message.error(err.msg));
            },
            actRole: function (command) {
                let self = this;
                let name = command.name;
                let role = command.role;
                self.role = role;
                if (name === 'edit') {
                    self.$message.error('暂未实现');
                    return;
                }
                else if(name === 'delete') {
                    self.$api.systemApi.deleteRole({id: role.id})
                        .then(() => {
                            self.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.loadData();
                        });
                }
                else if (name === 'assignPermission') {
                    if(!self.permissionList.length){
                        self.$api.systemApi.getRoleTree({userOnly:0})
                                .then((res) => {
                                    self.permissionList = res;
                                    self.showDialog = true;
                                })
                    }else {
                        self.showDialog = true;
                    }
                    self.$api.systemApi.getRolePermission({id: role.id})
                        .then((res) => {
                            self.defaultCheckedKeys = [].concat(res.map(function (item) {
                                return item.uuid
                            }));
                            self.$refs.tree.setCheckedNodes(self.defaultCheckedKeys)
                        })
                }
            },
            savePermissions: function () {
                // 获取全选和板悬的
                let self=this;
                let subData = this.$refs.tree.getCheckedKeys(true);
                self.$api.systemApi.assignPermission(self.role.id, subData)
                    .then(() => {
                        self.$message.success('分配成功');
                        self.showDialog = false;
                    }).catch(err => self.$message.error(err.msg));
            }
        }
    }
</script>

<style lang="less" scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
 /deep/ .el-table  {
  font-size:14px ;
}
  .page-wrapper{
    margin-top: 15px;
  }
</style>
