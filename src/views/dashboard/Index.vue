<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-card header="待办事项">
                <ul v-if="todoList.length > 0">
                    <li v-for="todo in todoList" :key="todo.id">
                        {{todo.title}}
                        <el-button size="mini" type="text" @click="process(todo)">处理</el-button>
                    </li>
                </ul>
                <span v-if="todoList.length === 0">暂无待办事项</span>
            </el-card>

            <el-dialog :title="todo.title" :visible="showDialog" :close-on-click-modal="false"
                       @close="showDialog=false">
                <el-form ref="form" :model="todo">
                    <el-form-item :label="item.title+'：'" v-for="(item,key) in todo.items" :key="key"
                                  label-width="120px">{{item.content}}
                    </el-form-item>
                </el-form>
                <template slot="footer">
                    <el-button type="danger" @click="audit('拒绝', todo.id)">拒绝</el-button>
                    <el-button type="primary" @click="audit('同意', todo.id)">同意</el-button>
                </template>
            </el-dialog>
        </el-col>
        <el-col :span="12">
            <el-card header="已延期计划">
                <ul v-if="delayPlanList.length > 0">
                    <li v-for="(plan,key) in delayPlanList" :key="key">
                        【{{plan.projectName}}】{{plan.executor}} - {{plan.planContent}}
                        <el-tag type="danger">{{plan.endDate}}</el-tag>
                    </li>
                </ul>
                <span v-if="delayPlanList.length === 0">暂无已延期计划</span>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                todoList: [],
                showDialog: false,
                todo: {},
                delayPlanList: []
            }
        },
        created() {
            // this.loadTodoList();
            // this.loadDelayPlanList();
        },
        methods: {
            loadDelayPlanList() {
                this.$api.projectApi.listDelayPlan()
                    .then(resp => this.delayPlanList = resp.items)
                    .catch(err => this.$message.error(err.msg));
            },
            audit(act, id) {
                this.$api.dashboardApi.auditTodo({id: id, act: act})
                    .then(() => {
                        this.$message.success('操作成功');
                        this.showDialog = false;
                        this.loadTodoList();
                    })
                    .catch(err => this.$message.error(err.msg));
            },
            process(todo) {
                // 点击“处理”后的操作
                this.$api.dashboardApi.getTodo({id: todo.id})
                    .then(resp => {
                        this.todo = resp;
                        this.showDialog = true;
                    })
                    .catch(err => this.$message.error(err.msg));
            },
            loadTodoList() {
                this.$api.dashboardApi.listTodo()
                    .then(resp => this.todoList = resp.items)
                    .catch(err => this.$message.error(err.msg));
            }
        }
    }
</script>

<style scoped>
    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    ul li {
        display: inline-block;
        width: 100%;
    }

    ul li .el-button {
        /*align-items: flex-end;*/
        float: right;
    }

    ul li .el-tag {
        float: right;
    }
</style>
