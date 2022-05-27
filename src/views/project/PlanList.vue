<template>
    <el-card>
        <el-row>
            <el-col :span="4">
                <el-button onclick="javascript:history.go(-1)">返回</el-button>
                <el-button type="primary" @click="addPlan"
                           v-has-permission="'plan:add'">添加计划
                </el-button>
            </el-col>
            <el-col :span="5">
                <b>项目</b>： {{projectName}}
            </el-col>
            <el-col :span="5">
                <b>目标</b>: {{milestoneName}}
            </el-col>
        </el-row>
        <br/><br/>
        <el-table ref="planList" v-has-permission="'plan:list'" :data="planList">
            <el-table-column prop="id" label="#"></el-table-column>
            <el-table-column prop="planContent" label="工作计划内容"></el-table-column>
            <el-table-column label="执行人" prop="executorNickName"></el-table-column>
            <el-table-column label="需求与支撑" prop="support"></el-table-column>
            <el-table-column label="计划完成时限" prop="endDate"></el-table-column>
            <el-table-column label="备注" prop="note"></el-table-column>
            <el-table-column label="工作总结">
                <el-table-column label="计划完成情况" prop="completionStatus"></el-table-column>
                <el-table-column label="实际完成时间" prop="completeTime"></el-table-column>
                <el-table-column label="总结" prop="problem"></el-table-column>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-dropdown type="primary" @command="actionPlan">
                        <el-button type="primary">操作 <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-has-permission="'plan:edit'"
                                              :command="{name:'editPlan', plan:scope.row, index:scope.$index}">编辑计划
                            </el-dropdown-item>
                            <el-dropdown-item v-has-permission="'plan:delete'"
                                              :command="{name:'deletePlan', plan:scope.row, index:scope.$index}">删除计划
                            </el-dropdown-item>
                            <el-dropdown-item v-has-permission="'plan:executeDone'"
                                              v-if="scope.row.completeTime==='-'"
                                              :command="{name:'executionCompleted', plan:scope.row, index:scope.$index}">
                                执行完成
                            </el-dropdown-item>
                            <el-dropdown-item v-has-permission="'plan:audit'"
                                              :command="{name:'audit', plan:scope.row, act:'pass'}">审核通过
                            </el-dropdown-item>
                            <el-dropdown-item v-has-permission="'plan:audit'"
                                              :command="{name:'audit', plan:scope.row, act:'nopass'}">审核不通过
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="total,prev,pager,next,jumper" :current-page.sync="pageInfo.curPage"
                       @current-change="handleCurrentChange" :total="pageInfo.total"></el-pagination>
        <el-dialog :title="title" :close-on-click-modal="false" v-has-any-permissions
                ="['plan:edit','plan:add']" :visible="showDialog" @close="showDialog=false">
            <el-form ref="form" label-width="100px">
                <el-form-item label="工作计划内容">
                    <el-input v-model="plan.planContent"></el-input>
                </el-form-item>
                <el-form-item label="开始日期">
                    <el-date-picker v-model="plan.startDate" type="date" placeholder="请选择开始日期" style="width:100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期">
                    <el-date-picker v-model="plan.endDate" type="date" placeholder="请选择结束日期" style="width:100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="审核人">
                    <el-select v-model="plan.auditUserId" style="width:100%;">
                        <el-option v-for="user in userList" :key="user.id" :value="user.id"
                                   :label="user.nickName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="plan.note" rows="5"></el-input>
                </el-form-item>
                <el-form-item label="存在问题">
                    <el-input type="textarea" v-model="plan.problem" rows="5"></el-input>
                </el-form-item>
                <el-form-item label="需求与支撑">
                    <el-input type="textarea" v-model="plan.support" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="showDialog=false">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </template>
        </el-dialog>
    </el-card>
</template>

<script>
    export default {
        name: "PlanList",
        data() {
            return {
                planList: [],
                title: '',
                showDialog: false,
                projectName: '',
                milestoneName: '',
                act: '',
                plan: {
                    milestoneId: this.$route.query.milestoneId,
                    planContent: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    note: '',
                    problem: '',
                    support: '',
                    id: 0,
                    auditUserId: 0,
                },
                userList: [],
                auditUserId: 0,
                pageInfo: {
                    curPage: 1,
                    total: 0
                }
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            handleCurrentChange(val) {
                this.pageInfo.curPage = val;
                this.loadData();
            },
            audit(command) {
                let msg = command.act === 'pass' ? '确定 审核通过 吗？' : '确定 审核不通过 吗？'
                let self = this;
                this.$confirm(msg, '提示', {
                    type: 'warning'
                }).then(() => {
                    self.$api.projectApi.auditPlan({
                        id: command.plan.id, act: command.act
                    }).then(() => {
                        self.$message.success('操作成功');
                        self.loadData();
                    }).catch(err => self.$message.error(err.msg));
                }).catch(e => console.log(e));
            },
            actionPlan(command) {
                let self = this;
                let name = command.name;
                let plan = command.plan;
                let index = command.index;
                if (name === 'deletePlan') {
                    this.$confirm('确认删除吗？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        self.$api.projectApi.deletePlan({id: plan.id})
                            .then(() => {
                                self.$message.success('删除成功');
                                self.planList.splice(index, 1);
                            }).catch(err => self.$message.error(err.msg));
                    }).catch(err => console.log(err));
                } else if (name === 'audit') {
                    this.audit(command);
                } else if (name === 'editPlan') {
                    // 编辑计划
                    self.showDialog = true;
                    self.title = '编辑计划';
                    // 进行拷贝，否则会修改到原始对象
                    self.plan = JSON.parse(JSON.stringify(plan));
                    self.act = 'update';
                } else if (name === 'executionCompleted') {
                    // 执行完成
                    self.$confirm('是否确定完成？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        self.$api.projectApi.completePlan({id: plan.id})
                            .then(() => {
                                self.$message.success('执行成功');
                                self.loadData();
                            }).catch(err => self.$message.error(err.msg));
                    }).catch(err => console.log(err));
                }
            },
            addPlan() {
                // 添加计划
                this.showDialog = true;
                this.title = '添加计划';
                this.plan.planContent = '';
                this.plan.startDate = new Date();
                this.plan.endDate = new Date();
                this.plan.note = '';
                this.plan.problem = '';
                this.plan.support = '';
                this.plan.id = 0;
                this.act = 'add';
                this.plan.auditUserId = this.auditUserId;
            },
            save() {
                let self = this;
                if (self.act === 'add') {
                    self.$api.projectApi.createPlan(this.plan)
                        .then(() => {
                            self.$message.success('添加成功');
                            self.showDialog = false;
                            self.loadData()
                        })
                        .catch(err => self.$message.error(err.msg));
                } else if (self.act === 'update') {
                    self.$api.projectApi.updatePlan(self.plan)
                        .then(() => {
                            self.$message.success('修改成功');
                            self.showDialog = false;
                            self.loadData()
                        })
                        .catch(err => self.$message.error(err.msg));
                }
            },
            loadData() {
                let self = this;
                self.$api.projectApi.listPlan({milestoneId: self.$route.query.milestoneId, curPage: self.pageInfo.curPage})
                    .then(resp => {
                        self.planList = resp.items;
                        self.projectName = resp.projectName;
                        self.milestoneName = resp.milestoneName;
                        self.userList = resp.users;
                        self.auditUserId = resp.auditUserId;
                        self.pageInfo.total = resp.total;
                    })
                    .catch(err => self.$message.error(err.msg));
            }
        }
    }
</script>

<style scoped>
</style>
