<template>
    <el-card>
        <el-button onclick="javascript:history.go(-1)">返回</el-button>
        <el-button type="primary" @click="showModal('add')"
                   v-has-permission="'milestone:add'">添加目标
        </el-button>
        <br/><br/>
        <el-table ref="milestoneList" v-has-permission="'milestone:list'" row-key="id" lazy :data="items"
                  :load="loadTree">
            <el-table-column width="100" prop="id" label="#" type=""></el-table-column>
            <el-table-column label="目标">
                <template slot-scope="scope">
                    <el-tooltip placement="right">
                        <div slot="content" v-html="wrap(scope.row.note)"></div>
                        <span>{{scope.row.milestoneName}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column width="100" prop="leaderNickName" label="负责人"></el-table-column>
            <el-table-column width="250" prop="executorNickName" label="执行人"></el-table-column>
            <el-table-column width="100" prop="startDate" label="开始日期"></el-table-column>
            <el-table-column width="100" prop="endDate" label="结束日期"></el-table-column>
            <el-table-column width="100" prop="milestoneStatus" label="状态"></el-table-column>
            <el-table-column width="200" label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button v-has-permission="'plan:list'" @click="listPlan(scope.row)">计划列表</el-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-dropdown v-has-any-permissions="['milestone:edit','milestone:delete']"
                                 @command="handleCommand">
                        <el-button type="primary">操作 <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-has-permission="'milestone:add'"
                                              :command="{name:'addSubMilestone', item: scope.row}">添加子目标
                            </el-dropdown-item>
                            <el-dropdown-item v-has-permission="'milestone:edit'"
                                              :command="{name:'edit', item: scope.row}">编辑目标
                            </el-dropdown-item>
                            <el-dropdown-item v-has-permission="'milestone:delete'"
                                              :command="{name:'delete', item:scope.row, index:scope.$index}">删除目标
                            </el-dropdown-item>
                            <el-dropdown-item v-has-permission="'milestone:audit'"
                                              :command="{name:'audit', item:scope.row, act:'pass'}">审核通过
                            </el-dropdown-item>
                            <el-dropdown-item v-has-permission="'milestone:audit'"
                                              :command="{name:'audit', item:scope.row, act:'nopass'}">审核不通过
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="total,prev,pager,next,jumper" :current-page.sync="pageInfo.curPage"
                       @current-change="handleCurrentChange" :total="pageInfo.total"></el-pagination>
        <el-dialog :title="title" :close-on-click-modal="false"
                   v-has-any-permissions="['milestone:edit','milestone:add']" :visible="showDialog"
                   @close="showDialog=false">
            <el-form ref="form" label-width="80px">
                <el-form-item label="父级目标" v-if="milestone.parentId>0">
                    <el-input v-model="milestone.parentName" disabled></el-input>
                </el-form-item>
                <el-form-item label="目标">
                    <el-input v-model="milestone.milestoneName"></el-input>
                </el-form-item>
                <el-form-item label="开始日期">
                    <el-date-picker v-model="milestone.startDate" type="date" placeholder="请选择开始日期" style="width:100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期">
                    <el-date-picker v-model="milestone.endDate" type="date" placeholder="请选择结束日期" style="width:100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-select v-model="milestone.leader" style="width:100%;">
                        <el-option v-for="user in users" :key="user.id" :value="user.id"
                                   :label="user.nickName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核人">
                    <el-select v-model="milestone.auditor" style="width:100%;">
                        <el-option v-for="user in users" :key="user.id" :value="user.id"
                                   :label="user.nickName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="执行人">
                    <el-select v-model="milestone.executor" multiple style="width:100%;">
                        <el-option v-for="user in users" :key="user.id" :value="user.id"
                                   :label="user.nickName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="milestone.note" rows="5"></el-input>
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
        name: "Milestone",
        data() {
            return {
                showDialog: false,
                title: '',
                items: [],
                users: [],
                milestone: {
                    id: 0,
                    auditor: '',
                    milestoneName: '',
                    leader: '',
                    executor: [],
                    parentId: 0,
                    parentName: '',
                    note: '',
                    startDate: undefined,
                    endDate: undefined,
                    projectId: this.$route.query.projectId,
                },
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
            listPlan(item) {
                this.$router.push(`/project/planList?milestoneId=${item.id}`);
            },
            newMilestone(item) {
                this.milestone.id = 0;
                this.milestone.milestoneName = '';
                this.milestone.leader = '';
                this.milestone.executor = [];
                this.milestone.parentId = 0;
                this.milestone.parentName = '';
                this.milestone.startDate = new Date();
                this.milestone.endDate = new Date();
                this.milestone.note = '';
                this.milestone.auditor = '';
                if (item !== undefined) {
                    this.milestone.parentId = item.id;
                    this.milestone.parentName = item.milestoneName;
                }
            },
            showModal(act, item) {
                if (act === 'add') {
                    if (item === undefined) {
                        this.title = '添加目标';
                        this.newMilestone();
                    } else {
                        this.title = '添加目标';
                        this.newMilestone(item);
                    }
                } else {
                    // 编辑目标
                    this.title = '编辑目标';
                    this.milestone.id = item.id;
                    this.milestone.milestoneName = item.milestoneName;
                    this.milestone.startDate = item.startDate;
                    this.milestone.endDate = item.endDate;
                    this.milestone.leader = item.leaderUserId;
                    this.milestone.executor = item.executor;
                    this.milestone.note = item.note;
                    this.milestone.parentId = item.parentId;
                    this.milestone.parentName = item.parentName;
                    this.milestone.auditor = item.auditor;
                }
                this.showDialog = true;
            },
            loadData() {
                this.$api.projectApi.milestoneAjax({id: this.$route.query.projectId, curPage: this.pageInfo.curPage})
                    .then(resp => {
                        this.items = resp.items;
                        this.users = resp.users;
                        this.pageInfo.total = resp.total;
                    })
                    .catch(err => this.$message.error(err.msg))
            },
            loadTree(tree, treeNode, resolve) {
                let self = this;
                this.$api.projectApi.milestoneAjax({id: self.milestone.projectId, parentId: tree.id})
                    .then(resp => resolve(resp.items))
                    .catch(e => this.$message.error(e.msg))
            },
            refreshLoadTree: function (parentId) {
                // 根据父级id取出对应节点数据
                let self = this;
                this.$api.projectApi.milestoneAjax({id: self.milestone.projectId, parentId: parentId})
                    .then(resp => this.$set(this.$refs.milestoneList.store.states.lazyTreeNodeMap, parentId, resp.items))
                    .catch(err => this.$message.error(err.msg))
            },
            wrap: function (content) {
                if (content !== null && content !== '') {
                    return content.replace(/\n/g, '<br />');
                }
                return '无备注';
            },
            handleCommand(command) {
                switch (command.name) {
                    case 'edit':
                        this.showModal('edit', command.item);
                        break;
                    case 'delete':
                        this.deleteMilestone(command.item);
                        break;
                    case 'audit':
                        console.log(command);
                        this.audit(command.item, command.act);
                        break;
                    case 'addSubMilestone':
                        this.addSubMilestone(command.item);
                        break;
                }
            },
            addSubMilestone(item) {
                this.showModal('add', item);
            },
            audit(item, act) {
                let self = this;
                let msg = act === 'pass' ? '确定审核通过吗？' : '确定审核不通过吗？'
                this.$confirm(msg, '提示', {
                    type: 'warning'
                }).then(() => {
                    self.$api.projectApi.auditMilestone({id: item.id, act: act})
                        .then(() => {
                            self.$message.success('操作成功');
                            self.loadData();
                            if (item.parentId > 0) {
                                self.refreshLoadTree(item.parentId);
                            }
                        })
                        .catch(err => self.$message.error(err.msg));
                })
                    .catch(err => console.log(err));
            },
            save() {
                let self = this;
                if (self.milestone.id === 0) {
                    // 添加目标
                    console.log('添加目标');
                    console.log(self.milestone)
                    self.$api.projectApi.createMilestone(self.milestone)
                        .then(() => {
                            self.$message.success('添加成功');
                            self.showDialog = false;
                            self.loadData();
                            if (self.milestone.parentId > 0) {
                                self.refreshLoadTree(self.milestone.parentId);
                            }
                        }).catch(err => this.$message.error(err.msg));
                } else {
                    // 修改目标
                    self.$api.projectApi.updateMilestone(self.milestone)
                        .then(() => {
                            self.$message.success('修改成功');
                            self.showDialog = false;
                            self.loadData();
                            if (self.milestone.parentId > 0) {
                                self.refreshLoadTree(self.milestone.parentId);
                            }
                        }).catch(err => this.$message.error(err.msg));
                }
            },
            deleteMilestone: function (item) {
                let self = this;
                // 删除目标
                this.$confirm('确认删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    self.$api.projectApi.deleteMilestone({
                        id: item.id
                    })
                        .then(() => {
                            self.$message.success('删除成功');
                            if (item.parentId > 0) {
                                self.refreshLoadTree(item.parentId);
                            } else {
                                self.items.forEach(function (item2, index, arr) {
                                    if (item2.id === item.id) {
                                        arr.splice(index, 1);
                                    }
                                });
                            }
                        }).catch(err => self.$message.error(err.msg));
                });
            }
        }
    }
</script>

<style lang="less" scoped>
/deep/ .el-table  {
  font-size:14px ;
}
</style>
