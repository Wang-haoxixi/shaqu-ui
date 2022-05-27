<template>
    <el-card>
        <el-table :data="data" row-key="id" lazy :load="handleLoad"
                  :tree-props="{children:'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="id" label="#" type=""></el-table-column>
            <el-table-column prop="menuName" label="菜单名称"></el-table-column>
            <el-table-column prop="permissionCode" label="权限标识"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-dropdown @command="handleCommand">
                        <el-button type="primary">
                            操作 <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{name:'add', row:scope.row}">添加</el-dropdown-item>
                            <el-dropdown-item :command="{name:'update', row:scope.row}">修改</el-dropdown-item>
                            <el-dropdown-item :command="{name:'delete', row:scope.row}">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {data: []}
        },
        created() {
            // this.loadData(0);
        },
        methods: {
            loadData: function () {
                let self = this;
                self.$api.systemApi.listMenu()
                    .then(resp => self.data = resp.items)
                    .catch(err => self.$message.error(err.msg));
            },
            handleCommand: function (command) {
                console.log(command);
                this.$message.error('暂未实现');
            },
            handleLoad: function (tree, treeNode, resolve) {
                let self = this;
                self.$api.systemApi.listMenu({parentId: tree.id})
                    .then(resp => resolve(resp.items))
                    .catch(e => self.$message.error(e.msg));
            }
        }
    }
</script>

<style scoped>

</style>
