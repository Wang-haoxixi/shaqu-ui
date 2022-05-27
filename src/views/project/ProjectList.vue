<template>
    <el-card>
        <el-button v-has-permission="'project:add'" type="primary" v-on:click="showModal(0,'添加项目')">添加项目
        </el-button>
        <br/><br/>
        <el-table :data="projectList">
            <el-table-column prop="id" label="#"></el-table-column>
            <el-table-column label="项目名称" width="300" prop="projectName">
<!--                <template slot-scope="scope">-->

<!--&lt;!&ndash;                    <el-link type="primary" @click="goMilestone(scope.row.id)">{{scope.row.projectName}}</el-link>&ndash;&gt;-->
<!--&lt;!&ndash;                    &ndash;&gt;-->
<!--                    <router-link class="project-title" :to="`/project/milestone?projectId=${scope.row.id}`">{{scope.row.projectName}}</router-link>-->
<!--                </template>-->
            </el-table-column>
            <el-table-column prop="shortName" label="简短名称"></el-table-column>
            <el-table-column prop="createBy" label="创建者"></el-table-column>
            <el-table-column label="进度">-</el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button v-has-permission="'milestone:list'" @click="listMilestone(scope.row.id)">目标列表</el-button>
                    <el-button type="primary" v-has-permission="'project:edit'"
                               @click="showModal(scope.row.id, '编辑项目')">编辑
                    </el-button>
                    <el-button type="danger" v-has-permission="'project:delete'" @click="deleteProject(scope.row.id)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="total,prev,pager,next,jumper" :current-page.sync="pageInfo.curPage"
                       @current-change="handleCurrentChange" :total="pageInfo.total"></el-pagination>

        <el-dialog :title="dialog.title" :visible="dialog.show" @close="dialog.show=false" :close-on-click-modal="false"
                   v-has-any-permissions="['project:edit', 'project:add']">
            <el-form ref="form" label-width="100px">
                <el-form-item label="项目名称">
                    <el-input v-model="project.projectName"></el-input>
                </el-form-item>
                <el-form-item label="简短项目名称">
                    <el-input v-model="project.shortName"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="project.projectDesc" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="dialog.show=false">取消</el-button>
                <el-button type="primary" @click="saveProject">确定</el-button>
            </template>
        </el-dialog>
    </el-card>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                projectList: [],
                project: {
                    id: 0,
                    projectName: '',
                    projectDesc: '',
                    shortName: '',
                },
                dialog: {
                    title: '',
                    show: false
                },
                pageInfo:{
                    curPage:1,
                    total:0
                }
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            handleCurrentChange(val){
                this.pageInfo.curPage = val;
                this.loadData();
            },
            listMilestone(id){
                this.$router.push(`/project/milestoneList?projectId=${id}`);
            },
            loadData() {
                this.$api.projectApi.listProject({curPage: this.pageInfo.curPage})
                    .then(resp => {
                        this.projectList = resp.items;
                        this.pageInfo.total = resp.total;
                    })
                    .catch(err => this.$message.error(err.msg));
            },
            showModal(id, title) {
                this.dialog.title = title;
                if (id != 0) {
                    // 编辑项目
                    this.$api.projectApi.detailProject({id: id})
                        .then(resp => {
                            this.project.projectName = resp.projectName;
                            this.project.projectDesc = resp.projectDesc;
                            this.project.shortName = resp.shortName;
                            this.project.id = id;
                        })
                        .catch(err => this.$message.error(err.msg));
                } else {
                    // 新增项目 id = 0;
                    this.project.projectName = '';
                    this.project.projectDesc = '';
                    this.project.shortName = '';
                    this.project.id = 0;
                }
                this.dialog.show = true;
            },
            saveProject() {
                if (this.project.id === 0) {
                    this.$api.projectApi.createProject(this.project)
                        .then(() => {
                            this.$message.success('添加成功');
                            this.dialog.show = false;
                            this.loadData();
                        })
                        .catch(err => {
                                self.$message.error(err.msg);
                                self.dialog.show = false;
                            }
                        );
                } else {
                    this.$api.projectApi.updateProject(this.project)
                        .then(() => {
                            this.$message.success('更新成功');
                            this.dialog.show = false;
                            this.loadData();
                        })
                        .catch(err => {
                            this.$message.error(err.msg);
                        })
                }
            },
            deleteProject(id) {
                this.$confirm('确认删除吗?', '提示', {type: 'warning'})
                    .then(() => {
                        this.$api.projectApi.deleteProject({id: id})
                            .then(() => {
                                this.$message.success('删除成功');
                                this.loadData();
                            })
                            .catch(err => this.$message.error(err.msg));
                    }).catch(err => {
                    console.log(err);
                });
            },
            goMilestone(id) {
                this.$router.push(`/project/milestone?projectId=${id}`);
            }
        }
    }
</script>

<style scoped>
    .project-title {
        text-decoration: none;
    }

    .project-title:hover {
        text-decoration: underline;
    }
</style>
